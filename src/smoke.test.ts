import { createClient } from "../src";

const apiKey = process.env.TRANSITLAND_API_KEY!

it('needs TRANSITLAND_API_KEY to be set', () => {
  expect(apiKey).not.toBeUndefined()
  expect(apiKey).not.toBeNull()
  expect(apiKey).not.toBe("")
});

it('should have not mutations', () => {
  const transitlandClient = createClient({
    apiKey: "yolo",
  });
  expect(transitlandClient).not.toHaveProperty('mutation')
})

it("can fetch feeds", async () => {
  const transitlandClient = createClient({
    apiKey,
  });

  const result = await transitlandClient.query({
    feeds: [
      {
        where: {
          onestop_id: "f-9q9-bart"
        }
      },
      {
        onestop_id: true
      }
    ]
  });
  expect(result.feeds[0]).toMatchInlineSnapshot(`
      Object {
        "onestop_id": "f-9q9-bart",
      }
    `);
});
