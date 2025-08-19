import setupDatabase from  "../schema/sql.scripts";

const run = async () => {
  console.log("🔧 Setting up the database...");
  await setupDatabase();
  process.exit(0);
};

run().catch((err) => {
  console.error("❌ Erreur lors de l exécution de setup-db:", err);
  process.exit(1);
});
