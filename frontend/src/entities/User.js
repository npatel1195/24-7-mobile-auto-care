// src/entities/User.js

export class User {
  constructor({ id, firstName, lastName, email, phone }) {
    this.id = id || null;
    this.firstName = firstName || "";
    this.lastName = lastName || "";
    this.email = email || "";
    this.phone = phone || "";
  }

  // Mock method to fetch user by ID
  static async fetchById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          new User({
            id,
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            phone: "123-456-7890",
          })
        );
      }, 500);
    });
  }

  // Instance method to get full name
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
