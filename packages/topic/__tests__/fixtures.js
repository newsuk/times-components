export default {
  name: "Test Name",
  description: [
    {
      name: "text",
      attributes: {
        value: "Test "
      },
      children: []
    },
    {
      name: "italic",
      attributes: {},
      children: [
        {
          name: "text",
          attributes: {
            value: "italic "
          },
          children: []
        }
      ]
    },
    {
      name: "bold",
      attributes: {},
      children: [
        {
          name: "text",
          attributes: {
            value: "bold"
          },
          children: []
        }
      ]
    },
    {
      name: "text",
      attributes: {
        value: " text."
      },
      children: []
    }
  ]
};
