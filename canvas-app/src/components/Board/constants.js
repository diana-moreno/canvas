const boardSections = [
  {
    position: 'top',
    startIndex: 0,
    endIndex: 7
  },
  {
    position: 'bottom',
    startIndex: 7,
    endIndex: 9
  }
]

const boxes = [
  {
    indexBox: 0,
    icon: 'all_inclusive',
    title: 'KEY PARTNERS',
    group: 'how',
    hint: "The most important activities in executing a company's value proposition. An example for Bic, the pen manufacturer, would be creating an efficient supply chain to drive down costs."
  },
  {
    indexBox: 1,
    icon: 'work_outline',
    title: 'KEY ACTIVITIES',
    group: 'how',
    hint: "The resources that are necessary to create value for the customer. They are considered assets to a company that are needed to sustain and support the business. These resources could be human, financial, physical and intellectual."
  },
  {
    indexBox: 2,
    icon: 'location_city',
    title: 'KEY RESOURCES',
    group: 'how',
    hint: "The resources that are necessary to create value for the customer. They are considered assets to a company that are needed to sustain and support the business. These resources could be human, financial, physical and intellectual."
  },
  {
    indexBox: 3,
    icon: 'redeem',
    title: 'VALUE PROPOSITIONS',
    group: 'what',
    hint: "The collection of products and services a business offers to meet the needs of its customers. According to Osterwalder (2004), a company's value proposition is what distinguishes it from its competitors. The value proposition provides value through various elements such as newness, performance, customization, getting the job done, design, brand/status, price, cost reduction, risk reduction, accessibility, and convenience/usability."
  },
  {
    indexBox: 4,
    icon: 'group',
    title: 'CUSTOMER RELATIONSHIPS',
    group: 'with',
    hint: "To ensure the survival and success of any businesses, companies must identify the type of relationship they want to create with their customer segments."
  },
  {
    indexBox: 5,
    icon: 'local_shipping',
    title: 'CHANNELS',
    group: 'with',
    hint: "A company can deliver its value proposition to its targeted customers through different channels. Effective channels will distribute a company's value proposition in ways that are fast, efficient and cost-effective. An organization can reach its clients through its own channels (store front), partner channels (major distributors), or a combination of both"
  },
  {
    indexBox: 6,
    icon: 'list_alt',
    title: 'CUSTOMER SEGMENTS',
    group: 'with',
    hint: "To build an effective business model, a company must identify which customers it tries to serve. Various sets of customers can be segmented based on their different needs and attributes to ensure appropriate implementation of corporate strategy to meet the characteristics of selected groups of clients."
  },
  {
    indexBox: 7,
    icon: 'money_off',
    title: 'COST STRUCTURE', group: 'how-many',
    hint: "This describes the most important monetary consequences while operating under different business models."
  },
  {
    indexBox: 8,
    icon: 'attach_money',
    title: 'REVENUE STREAMS',
    group: 'how-many',
    hint: "The way a company makes income from each customer segment."
  }
]

export default { boxes, boardSections }