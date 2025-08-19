const up = async () => {
  const extension = `
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `;
  // Create a users table if it doesn't exist
  const users = `
        CREATE TABLE IF NOT EXISTS users (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          last_name VARCHAR(30),
          first_name VARCHAR(50),
          is_email_verified BOOLEAN DEFAULT FALSE,
          phone VARCHAR(20),
          picture VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          role_id UUID REFERENCES roles(id) ON DELETE SET NULL

      );
    `;


  const roles = `
        CREATE TABLE IF NOT EXISTS roles (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name VARCHAR(50) UNIQUE NOT NULL,
          description TEXT,
          is_active BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
      );
    `;

  const permissions = `
        CREATE TABLE IF NOT EXISTS permissions (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name VARCHAR(100) UNIQUE NOT NULL,
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

}