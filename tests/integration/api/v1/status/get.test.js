test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.update_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toEqual(parsedUpdatedAt);

  expect(responseBody.db_version).toMatch(/PostgreSQL/);
  expect(typeof responseBody.used_conn).toBe("number");
  expect(typeof parseInt(responseBody.max_db_conn)).toBe("number");
  //console.log("Meu teste: ", responseBody);
});
