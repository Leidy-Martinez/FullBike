// Initiate mock data for the Customer table
const mockData = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        phoneNumber: '(555) 123-4567'
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        phoneNumber: '(555) 987-6543'
    },
    {
        id: 3,
        name: 'Bob Wilson',
        email: 'bob@example.com',
        password: 'password123',
        phoneNumber: '(555) 246-8135'
    },
    {
        id: 4,
        name: 'Alice Johnson',
        email: 'alice@example.com',
        password: 'password123',
        phoneNumber: '(555) 135-2468'
    },
    {
        id: 5,
        name: 'Charlie Brown',
        email: 'charlie@example.com',
        password: 'password123',
        phoneNumber: '(555) 468-3579'
    }

];

async function syncMockData() {
    try {
        await Customer.bulkCreate(mockData, {
            updateOnDuplicate: ["name", "email", "password", "phoneNumber"], // Update all non-primary key fields
        });
        console.log("Mock data synced successfully");
    } catch (error) {
        console.error("Error syncing mock data:", error);
    }
}

syncMockData();

module.exports = mockData;
