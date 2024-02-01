import request from "supertest";
import { app, sequelize } from "../express";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John Doe",
        address: {
          street: "Main St",
          city: "Springfield",
          number: 123,
          zip: "62701",
        },
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("John Doe");
    expect(response.body.address.street).toBe("Main St");
    expect(response.body.address.number).toBe(123);
    expect(response.body.address.city).toBe("Springfield");
    expect(response.body.address.zip).toBe("62701");
  });

  it("should not create a customer", async () => {
    const response = await request(app).post("/customer").send({
      name: "John Doe",
    });

    expect(response.status).toBe(500);
  });

  it("should list all customers", async () => {
    await request(app)
      .post("/customer")
      .send({
        name: "John Doe",
        address: {
          street: "Main St 1",
          city: "Springfield",
          number: 123,
          zip: "62701",
        },
      });

    await request(app)
      .post("/customer")
      .send({
        name: "Jane Doe",
        address: {
          street: "Main St 2",
          city: "Springfield",
          number: 123,
          zip: "62701",
        },
      });

    const response = await request(app).get("/customer");

    expect(response.status).toBe(200);
    expect(response.body.customers.length).toBe(2);

    expect(response.body.customers[0].name).toBe("John Doe");
    expect(response.body.customers[0].address.street).toBe("Main St 1");

    expect(response.body.customers[1].name).toBe("Jane Doe");
    expect(response.body.customers[1].address.street).toBe("Main St 2");

    const listResponseXML = await request(app)
      .get("/customer")
      .set("Accept", "application/xml")
      .send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(
      `<?xml version="1.0" encoding="UTF-8"?>`
    );

    expect(listResponseXML.text).toContain(`<customers>`);
    expect(listResponseXML.text).toContain(`<customer>`);
    expect(listResponseXML.text).toContain(`<name>John Doe</name>`);
    expect(listResponseXML.text).toContain(`<street>Main St 1</street>`);
    expect(listResponseXML.text).toContain(`<number>123</number>`);
    expect(listResponseXML.text).toContain(`<zip>62701</zip>`);
    expect(listResponseXML.text).toContain(`<city>Springfield</city>`);
    expect(listResponseXML.text).toContain(`</customer>`);
    expect(listResponseXML.text).toContain(`<customer>`);
    expect(listResponseXML.text).toContain(`<name>Jane Doe</name>`);
    expect(listResponseXML.text).toContain(`<street>Main St 2</street>`);
    expect(listResponseXML.text).toContain(`<number>123</number>`);
    expect(listResponseXML.text).toContain(`<zip>62701</zip>`);
    expect(listResponseXML.text).toContain(`<city>Springfield</city>`);
    expect(listResponseXML.text).toContain(`</customer>`);
    expect(listResponseXML.text).toContain(`</customers>`);
  });
});
