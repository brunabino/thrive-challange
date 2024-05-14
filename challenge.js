const fs = require('fs');
const usersData = require('./users.json');
const companiesData = require('./companies.json');

// Sort the companies data by ID
companiesData.sort((a, b) => a.id - b.id);

// Sort the users data by Last Name then First Name
usersData.sort((a, b) => {
    if (a.last_name < b.last_name) return -1;
    if (a.last_name > b.last_name) return 1;
    if (a.first_name < b.first_name) return -1;
    if (a.first_name > b.first_name) return 1;
    return 0;
});


let outputLines = [];

// Process each company and users, considering the rules stabilhed by the challenge
companiesData.forEach(company => {
    let userCount = 0;
    let auxOutputlines = [];
    auxOutputlines.push(`Company Id: ${company.id}`);
    auxOutputlines.push(`Company Name: ${company.name}`);
    auxOutputlines.push('Users Emailed:');
    
    
    usersData.forEach(user => {
        if (user.active_status === true && user.email_status === true && user.company_id === company.id && company.email_status === true) {
            auxOutputlines.push(`${user.last_name}, ${user.first_name}, ${user.email}`);
            auxOutputlines.push(`Previous Token Balance: ${user.tokens}`);
            auxOutputlines.push(`New Token Balance: ${user.tokens + company.top_up}`);
            userCount++;
        }
    });
    
    auxOutputlines.push('Users Not Emailed:');
    usersData.forEach(user => {
        if (user.active_status === true && user.company_id === company.id && (user.email_status === false || company.email_status === false)) {
            auxOutputlines.push(`${user.last_name}, ${user.first_name}, ${user.email}`);
            auxOutputlines.push(`Previous Token Balance: ${user.tokens}`);
            auxOutputlines.push(`New Token Balance: ${user.tokens + company.top_up}`);
            userCount++;
        }
    });

    const totalTopUp = company.top_up * userCount;
    auxOutputlines.push(`Total amount of top ups for ${company.name}: ${totalTopUp}`);
    auxOutputlines.push(''); 
    if (userCount > 0) outputLines.push(...auxOutputlines)
});


const outputText = outputLines.join('\n');

// Genarates the output.txt file
fs.writeFileSync('output.txt', outputText, 'utf8');

console.log('Output written to output.txt');
