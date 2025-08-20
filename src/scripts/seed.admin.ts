import bcrypt from "bcryptjs";

import pool from "../shared/lib/db.client"
async function seedSuperadmin() {
  const email = "loyal@gmail.com";
  const password = "Fidele82@@";
  const first_name = "LKE";
  const last_name = "Fidele";
  const hashedPassword = await bcrypt.hash(password, 10);

  // ➤ Créer ou récupérer l'utilisateur
  let user = await pool.query(
    `INSERT INTO users (email, password, first_name, last_name)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (email) DO NOTHING
       RETURNING id`,
    [email, hashedPassword, first_name, last_name]
  );

  if (user.rows.length === 0) {
    user = await pool.query(`SELECT id FROM users WHERE email = $1`, [email]);
  }

  // ➤ Créer ou récupérer le rôle
  let role = await pool.query(
    `INSERT INTO roles (name, description)
       VALUES ($1, $2)
       ON CONFLICT (name) DO NOTHING
       RETURNING id`,
    ["admin", "Administrateur de la plateforme"]
  );

  if (role.rows.length === 0) {
    role = await pool.query(`SELECT id FROM roles WHERE name = $1`, ["admin"]);
  }

  // ➤ Mettre à jour le rôle de l'utilisateur
  await pool.query(
    `INSERT INTO user_role (role_id, user_id) 
       VALUES ($1, $2)
       ON CONFLICT (role_id, user_id) DO NOTHING;
    `, [
    role.rows[0].id,
    user.rows[0].id,
  ]);

  console.log("Superadmin inséré ou mis à jour !");
  process.exit(0);
}

seedSuperadmin();
