const usersData = require('../users.json');
const companiesData = require('../companies.json');

describe('Contract Test for Users JSON', () => {
    test('should be an array', () => {
        expect(Array.isArray(usersData)).toBe(true);
    });

    test('should have required fields for each user', () => {
        usersData.forEach(user => {
            expect(user).toHaveProperty('id');
            expect(typeof user.id).toBe('number');

            expect(user).toHaveProperty('first_name');
            expect(typeof user.first_name).toBe('string');

            expect(user).toHaveProperty('last_name');
            expect(typeof user.last_name).toBe('string');

            expect(user).toHaveProperty('email');
            expect(typeof user.email).toBe('string');

            expect(user).toHaveProperty('company_id');
            expect(typeof user.company_id).toBe('number');

            expect(user).toHaveProperty('email_status');
            expect(typeof user.email_status).toBe('boolean');

            expect(user).toHaveProperty('active_status');
            expect(typeof user.active_status).toBe('boolean');

            expect(user).toHaveProperty('tokens');
            expect(typeof user.tokens).toBe('number');
        });
    });


    test('should have valid email addresses', () => {
        usersData.forEach(user => {
            expect(user.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        });
    });

});

describe('Contract Test for Companies JSON', () => {
    test('should be an array', () => {
        expect(Array.isArray(companiesData)).toBe(true);
    });

    test('should have required fields for each company', () => {
        companiesData.forEach(company => {
            expect(company).toHaveProperty('id');
            expect(typeof company.id).toBe('number');

            expect(company).toHaveProperty('name');
            expect(typeof company.name).toBe('string');

            expect(company).toHaveProperty('top_up');
            expect(typeof company.top_up).toBe('number');

            expect(company).toHaveProperty('email_status');
            expect(typeof company.email_status).toBe('boolean');
        });
    });

    test('should have unique IDs for each company', () => {
        const ids = companiesData.map(company => company.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(ids.length);
    });

});