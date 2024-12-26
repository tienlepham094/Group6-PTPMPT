// Resource Management Module

// Define interfaces for Resource, User, and Allocation
interface Resource {
    id: string;
    name: string;
    type: string;
    status: string;
    allocatedTo?: string;
}

interface User {
    id: string;
    name: string;
    role: string;
}

interface Allocation {
    resourceId: string;
    userId: string;
    startDate: Date;
    endDate?: Date;
}

// Mock data for resources and users
const resources: Resource[] = [];
const users: User[] = [];
const allocations: Allocation[] = [];

// Utility functions
function generateId(): string {
    return Math.random().toString(36).substr(2, 9);
}

function getResourceById(resourceId: string): Resource | undefined {
    return resources.find(resource => resource.id === resourceId);
}

function getUserById(userId: string): User | undefined {
    return users.find(user => user.id === userId);
}

function addResource(name: string, type: string): Resource {
    const resource: Resource = {
        id: generateId(),
        name,
        type,
        status: "available",
    };
    resources.push(resource);
    return resource;
}

function addUser(name: string, role: string): User {
    const user: User = {
        id: generateId(),
        name,
        role,
    };
    users.push(user);
    return user;
}

function allocateResource(resourceId: string, userId: string, startDate: Date): string {
    const resource = getResourceById(resourceId);
    const user = getUserById(userId);

    if (!resource) return "Resource not found.";
    if (!user) return "User not found.";
    if (resource.status !== "available") return "Resource is not available.";

    resource.status = "allocated";
    resource.allocatedTo = userId;
    allocations.push({ resourceId, userId, startDate });

    return "Resource allocated successfully.";
}

function releaseResource(resourceId: string): string {
    const resource = getResourceById(resourceId);

    if (!resource) return "Resource not found.";
    if (resource.status !== "allocated") return "Resource is not allocated.";

    resource.status = "available";
    resource.allocatedTo = undefined;

    return "Resource released successfully.";
}

function getAllocationsByUser(userId: string): Allocation[] {
    return allocations.filter(allocation => allocation.userId === userId);
}

function listAvailableResources(): Resource[] {
    return resources.filter(resource => resource.status === "available");
}

function listAllocatedResources(): Resource[] {
    return resources.filter(resource => resource.status === "allocated");
}

function addMockData(): void {
    // Adding mock resources
    addResource("GPU-1", "GPU");
    addResource("CPU-1", "CPU");
    addResource("Memory-1", "RAM");

    // Adding mock users
    addUser("Alice", "admin");
    addUser("Bob", "developer");
}

function displayResources(): void {
    console.table(resources);
}

function displayUsers(): void {
    console.table(users);
}

function displayAllocations(): void {
    console.table(allocations);
}

addMockData();

// Example Operations
console.log("Allocating GPU-1 to Alice:", allocateResource(resources[0].id, users[0].id, new Date()));
console.log("Available Resources:", listAvailableResources());
console.log("Allocated Resources:", listAllocatedResources());
displayResources();
displayUsers();
displayAllocations();

// Search functionality
function searchResourcesByName(name: string): Resource[] {
    return resources.filter(resource => resource.name.includes(name));
}

console.log("Searching resources by name 'GPU':", searchResourcesByName("GPU"));

// Update resource details
function updateResourceDetails(resourceId: string, name: string, type: string): string {
    const resource = getResourceById(resourceId);

    if (!resource) return "Resource not found.";

    resource.name = name;
    resource.type = type;

    return "Resource details updated successfully.";
}

console.log("Updating resource GPU-1:", updateResourceDetails(resources[0].id, "Updated GPU", "Graphics Card"));

// Remove resource
function removeResource(resourceId: string): string {
    const resourceIndex = resources.findIndex(resource => resource.id === resourceId);

    if (resourceIndex === -1) return "Resource not found.";

    resources.splice(resourceIndex, 1);

    return "Resource removed successfully.";
}

console.log("Removing resource GPU-1:", removeResource(resources[0].id));
console.log("All Resources:");
displayResources();
