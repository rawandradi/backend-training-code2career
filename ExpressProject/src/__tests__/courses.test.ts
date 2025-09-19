import { faker } from "@faker-js/faker";
import { api } from "./helpers/app";
import { seedUsers } from "./helpers/seed";

describe("Course module", () => {
  test("POST /courses → COACH can create a course (201)", async () => {
    const { coach1 } = await seedUsers();
    const payload = {
      title: faker.lorem.words({ min: 2, max: 5 }),
      description: faker.lorem.sentence(),
      image: faker.image.url()
    };

    const res = await api()
      .post("/courses")
      .set("Authorization", `Bearer ${coach1.token}`)
      .send(payload);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      id: expect.any(String),
      title: payload.title,
      description: payload.description,
      image: payload.image
    });
  });

  test("POST /courses → STUDENT forbidden (403)", async () => {
    const { student } = await seedUsers();
    const payload = { title: faker.lorem.word(), description: faker.lorem.sentence() };

    const res = await api()
      .post("/courses")
      .set("Authorization", `Bearer ${student.token}`)
      .send(payload);

    expect(res.status).toBe(403);
    expect(res.body?.error || res.text).toBeTruthy();
  });

  test("POST /courses → validation error (400) when fields missing", async () => {
    const { coach1 } = await seedUsers();
    const payload = { title: "" }; // invalid for Zod

    const res = await api()
      .post("/courses")
      .set("Authorization", `Bearer ${coach1.token}`)
      .send(payload);

    expect(res.status).toBe(400);
    // If you return Zod error details, assert them:
    expect(res.body).toHaveProperty("errors");
  });

  test("GET /courses → returns empty array when none", async () => {
    // No seed of courses here on purpose
    await seedUsers();
    const res = await api().get("/courses");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  test("GET /courses → returns list after creation", async () => {
    const { coach1 } = await seedUsers();
    const payload = { title: faker.lorem.words(3), description: faker.lorem.sentence() };

    await api().post("/courses").set("Authorization", `Bearer ${coach1.token}`).send(payload);

    const res = await api().get("/courses");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toHaveProperty("id");
  });

  test("GET /courses/:id → 200 with valid id", async () => {
    const { coach1 } = await seedUsers();
    const payload = { title: faker.lorem.words(3), description: faker.lorem.sentence() };
    const created = await api().post("/courses").set("Authorization", `Bearer ${coach1.token}`).send(payload);

    const id = created.body.id as string;
    const res = await api().get(`/courses/${id}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(id);
  });

  test("GET /courses/:id → 404 with invalid id", async () => {
    await seedUsers();
    const res = await api().get(`/courses/${faker.string.uuid()}`);
    expect(res.status).toBe(404);
  });

  test("PUT /courses/:id → owner COACH can update (200)", async () => {
    const { coach1 } = await seedUsers();
    const created = await api().post("/courses").set("Authorization", `Bearer ${coach1.token}`).send({
      title: "Old",
      description: "Old desc"
    });

    const res = await api()
      .put(`/courses/${created.body.id}`)
      .set("Authorization", `Bearer ${coach1.token}`)
      .send({ title: "New Title" });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe("New Title");
  });

  test("PUT /courses/:id → STUDENT forbidden (403)", async () => {
    const { coach1, student } = await seedUsers();
    const created = await api().post("/courses").set("Authorization", `Bearer ${coach1.token}`).send({
      title: "Course A",
      description: "desc"
    });

    const res = await api()
      .put(`/courses/${created.body.id}`)
      .set("Authorization", `Bearer ${student.token}`)
      .send({ title: "Hack" });

    expect(res.status).toBe(403);
  });

  test("PUT /courses/:id → COACH cannot update another COACH’s course (403)", async () => {
    const { coach1, coach2 } = await seedUsers();
    const created = await api().post("/courses").set("Authorization", `Bearer ${coach1.token}`).send({
      title: "Course A",
      description: "desc"
    });

    const res = await api()
      .put(`/courses/${created.body.id}`)
      .set("Authorization", `Bearer ${coach2.token}`)
      .send({ title: "Steal" });

    expect(res.status).toBe(403);
  });

  test("DELETE /courses/:id → owner COACH can delete (204)", async () => {
    const { coach1 } = await seedUsers();
    const created = await api().post("/courses").set("Authorization", `Bearer ${coach1.token}`).send({
      title: "Delete Me",
      description: "desc"
    });

    const res = await api()
      .delete(`/courses/${created.body.id}`)
      .set("Authorization", `Bearer ${coach1.token}`);

    expect(res.status).toBe(204);

    const getAfter = await api().get(`/courses/${created.body.id}`);
    expect(getAfter.status).toBe(404);
  });

  test("DELETE /courses/:id → STUDENT forbidden (403)", async () => {
    const { coach1, student } = await seedUsers();
    const created = await api().post("/courses").set("Authorization", `Bearer ${coach1.token}`).send({
      title: "Nope",
      description: "desc"
    });

    const res = await api()
      .delete(`/courses/${created.body.id}`)
      .set("Authorization", `Bearer ${student.token}`);

    expect(res.status).toBe(403);
  });

  test("DELETE /courses/:id → COACH cannot delete another COACH’s course (403)", async () => {
    const { coach1, coach2 } = await seedUsers();
    const created = await api().post("/courses").set("Authorization", `Bearer ${coach1.token}`).send({
      title: "Protect",
      description: "desc"
    });

    const res = await api()
      .delete(`/courses/${created.body.id}`)
      .set("Authorization", `Bearer ${coach2.token}`);

    expect(res.status).toBe(403);
  });
});
