import db from "../shared/lib/db.client";

const up = async () => {
  const extension = `
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `;
  // Create a users table if it doesn't exist
  const users = `
        CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          first_name VARCHAR(50) UNIQUE NOT NULL,
          last_name VARCHAR(80) NOT NULL,
          status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('active', 'blocked', 'pending')),
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          cover_letter TEXT,
          cv VARCHAR(255),
          picture VARCHAR(255),
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
      );
    `;

  const roles = `
        CREATE TABLE IF NOT EXISTS roles (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name VARCHAR(50) UNIQUE NOT NULL,
          description TEXT,
          status BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
      );
    `;

  const permissions = `
        CREATE TABLE IF NOT EXISTS permissions (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name VARCHAR(100) UNIQUE NOT NULL,
          description TEXT,
          created_at TIMESTAMP DEFAULT NOW()
      );
    `;

  const rolesPermissions = `
        CREATE TABLE IF NOT EXISTS role_permission (
          role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
          permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
          PRIMARY KEY (role_id, permission_id)
      );
    `;

  const usersRoles = `
        CREATE TABLE IF NOT EXISTS user_role (
          role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
          user_id UUID REFERENCES users(id) ON DELETE CASCADE,
          PRIMARY KEY (role_id, user_id)
      );
    `;
  //Time execution
  console.time("Creating tables...");

  await db.query(extension);
  await db.query(roles);
  await db.query(users);
  await db.query(permissions);
  await db.query(rolesPermissions);
  await db.query(usersRoles);

  console.timeEnd("Ending creating tables...");
};

export default up;
