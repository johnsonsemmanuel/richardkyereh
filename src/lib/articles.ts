import { images } from "./images";

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: { name: string; avatar: string };
  date: string;
  readTime: string;
  tags: string[];
}

export const articles: Article[] = [
  {
    slug: "global-aviation-summit-2026",
    title: "Richard Kyereh Speaks at Global Aviation Summit 2026",
    excerpt:
      "Keynote address on the future of fleet management and sustainable aviation in emerging markets.",
    content: `The global aviation industry stands at a pivotal crossroads. As we gathered at the Global Aviation Summit 2026 in Dubai, the consensus was clear: the next decade will redefine how airlines operate, compete, and grow.

In my keynote address, I emphasised three critical areas that will shape the industry's trajectory over the coming years.

<h2>Fleet Modernisation in Emerging Markets</h2>

Emerging markets, particularly across Africa and Southeast Asia, present the most significant growth opportunity for aerospace. With a rapidly expanding middle class and increasing urbanisation, air travel demand in these regions is projected to grow at 5.2% annually through 2030.

However, fleet modernisation remains a challenge. Many carriers operate ageing aircraft that are fuel-inefficient and increasingly difficult to maintain. The shift toward next-generation narrowbodies — the A320neo family and the 737 MAX — offers a path forward, but requires careful capital planning and strategic lease structuring.

<h2>Sustainable Aviation Fuel: Beyond the Hype</h2>

SAF remains a hot topic, but we must separate rhetoric from reality. Current global SAF production accounts for less than 0.5% of total jet fuel consumption. While commitments are promising, the infrastructure investments required to scale production are substantial.

My recommendation to carriers is pragmatic: invest in SAF offtake agreements today to secure supply, but maintain operational flexibility. The technology landscape is evolving rapidly, and today's premium could become tomorrow's standard.

<h2>Safety Culture as Competitive Advantage</h2>

The carriers that will thrive in the coming decade are those that treat safety not as a compliance requirement but as a strategic asset. A robust safety culture reduces incident rates, lowers insurance premiums, improves crew retention, and enhances brand reputation.

I challenged summit attendees to move beyond the traditional safety management system mindset and embrace a holistic approach that integrates safety into every operational decision.

The summit reinforced my conviction that African aviation, despite its challenges, holds immense potential. With the right strategic partnerships, investment frameworks, and regulatory alignment, the continent can emerge as a significant player in global aerospace.`,
    image: images.emirates,
    author: { name: "Press Team", avatar: "" },
    date: "Jun 2026",
    readTime: "3 min read",
    tags: ["Speaking", "Industry"],
  },
  {
    slug: "global-fleet-management-2026",
    title: "The State of Global Fleet Management in 2026",
    excerpt:
      "An analysis of fleet utilization trends, lease rates, and emerging market dynamics shaping aerospace investment decisions.",
    content: `The aerospace fleet management landscape in 2026 reflects a market in transition. After the turbulence of the early 2020s, the industry has stabilised, but new dynamics are emerging that demand strategic attention.

<h2>Lease Rate Trends</h2>

Aircraft lease rates have seen a steady increase over the past 18 months, driven by constrained supply of next-generation narrowbodies and strong demand from carriers expanding their networks. The current environment favours lessors, with lease rates for A320neo and 737-8 aircraft approximately 15-20% higher than pre-pandemic levels.

For airlines, this means lease vs. buy decisions require more rigorous analysis. The traditional 12-year lease term may no longer be optimal; shorter terms with extension options provide greater flexibility in a dynamic market.

<h2>Fleet Utilisation Patterns</h2>

Global fleet utilisation has recovered to 92% of 2019 levels, but regional variations are significant. North American and European carriers lead the recovery, while some Asian and African markets continue to lag due to infrastructure constraints and regulatory hurdles.

The bright spot is Africa, where utilisation rates have climbed to 85% of pre-pandemic levels and continue to improve. This growth is supported by new route developments, increased intra-African trade under the AfCFTA framework, and improving regulatory harmonisation.

<h2>Emerging Market Opportunities</h2>

The most compelling fleet management opportunities lie in markets where infrastructure investment is accelerating. New airports in Ethiopia, Rwanda, Ghana, and Senegal are creating capacity that will absorb additional aircraft over the next five years.

Forward-thinking fleet managers are already positioning themselves to capture this growth, securing delivery slots and negotiating flexible lease terms that allow for rapid scaling as demand materialises.

The key takeaway for 2026 is that fleet management has evolved from an operational function to a strategic imperative. The carriers that treat their fleet as a dynamic asset portfolio — continuously optimised for market conditions — will outperform those that take a static approach.`,
    image: images.cargoPlane,
    author: { name: "Richard Kyereh", avatar: "" },
    date: "May 2026",
    readTime: "6 min read",
    tags: ["Fleet", "Markets"],
  },
  {
    slug: "advisory-framework-african-carriers",
    title: "New Advisory Framework for African Carriers Launched",
    excerpt:
      "A comprehensive framework designed to help African carriers meet international safety and operational standards.",
    content: `Today marks the launch of a comprehensive advisory framework specifically designed for African carriers seeking to elevate their operational standards and compete on the global stage.

<h2>Why African Carriers Need a Dedicated Framework</h2>

African airlines operate in a unique environment characterised by fragmented airspace, varying regulatory standards, infrastructure gaps, and intense competition from well-capitalised international carriers. Off-the-shelf advisory solutions developed for European or North American markets often fail to address these specific challenges.

The new framework addresses five critical pillars: safety management, operational efficiency, regulatory compliance, commercial strategy, and human capital development.

<h2>Safety Management Systems</h2>

The framework provides a structured approach to implementing Safety Management Systems that align with ICAO standards while accounting for local operational realities. This includes practical guidance on hazard identification, risk assessment, and safety performance monitoring.

We have incorporated lessons from successful implementations across the continent, including carriers that have achieved IATA Operational Safety Audit (IOSA) registration and those working toward it.

<h2>Operational Efficiency</h2>

Fuel management, maintenance planning, and crew utilisation are areas where African carriers can achieve significant improvements. The framework includes benchmarking data, best practice guidelines, and implementation roadmaps tailored to different carrier sizes and business models.

<h2>Regulatory Compliance</h2>

Navigating the regulatory landscape across multiple jurisdictions remains one of the most challenging aspects of African aviation. Our framework provides a compliance roadmap that helps carriers understand and meet the requirements of their national civil aviation authorities, regional bodies like AFCAC, and international standards.

The framework is now available to carriers across the continent through our advisory practice. Early adopters have reported measurable improvements in safety metrics, operational reliability, and commercial performance.`,
    image: images.cockpitInstruments,
    author: { name: "Press Team", avatar: "" },
    date: "Apr 2026",
    readTime: "4 min read",
    tags: ["Advisory", "Africa"],
  },
  {
    slug: "safety-management-systems-beyond-compliance",
    title: "Safety Management Systems Beyond Compliance",
    excerpt:
      "How leading carriers are transforming SMS from a regulatory requirement into a competitive advantage in operations.",
    content: `Safety Management Systems have traditionally been viewed as a regulatory burden — a necessary compliance activity that consumes resources without delivering tangible business value. But the most successful carriers have flipped this narrative.

<h2>The SMS Evolution</h2>

Leading airlines have transformed their SMS from a documentation exercise into an operational intelligence platform. By integrating safety data with maintenance records, flight operations data, and crew performance metrics, these carriers gain insights that drive operational improvements across the organisation.

<h2>Data-Driven Safety</h2>

The key enabler of this transformation is data. Modern aircraft generate terabytes of data per flight, covering everything from engine performance to pilot control inputs. Airlines that effectively capture, analyse, and act on this data gain a significant competitive advantage.

Flight data monitoring programmes, once used primarily for incident investigation, now provide real-time insights that enable proactive risk management. Carriers using advanced analytics have reported 30-40% reductions in approach and landing incidents.

<h2>Safety Culture as Strategy</h2>

The most important element of any SMS is culture. A positive safety culture — where employees feel empowered to report hazards without fear of reprisal — is the foundation upon which effective safety management is built.

We have observed that carriers with strong safety cultures consistently outperform their peers on operational metrics including on-time performance, fuel efficiency, and customer satisfaction. Safety, it turns out, is not a cost centre but a profit centre.

<h2>Practical Steps</h2>

For carriers looking to move beyond compliance, I recommend three immediate actions: invest in data analytics capability, establish a just culture policy, and integrate safety performance into executive compensation metrics.

The future of aviation safety is predictive, not reactive. Carriers that embrace this paradigm will not only be safer — they will be more competitive.`,
    image: images.controlPanel,
    author: { name: "Richard Kyereh", avatar: "" },
    date: "Apr 2026",
    readTime: "4 min read",
    tags: ["Safety", "Compliance"],
  },
  {
    slug: "aerospace-west-africa-interview",
    title: "Interview: The State of Aerospace in West Africa",
    excerpt:
      "An in-depth conversation on regional aviation growth, infrastructure challenges, and investment opportunities.",
    content: `In this wide-ranging interview, I sat down with Aviation Business Review to discuss the state of aerospace in West Africa, the challenges and opportunities facing the region, and the strategic priorities that will shape its aviation future.

<h2>Regional Growth Drivers</h2>

West Africa represents one of the most exciting aviation markets in the world. With a population exceeding 400 million people and GDP growth averaging 3.5% annually, the region has fundamental demand drivers that support sustained air transport growth.

The implementation of the African Continental Free Trade Area (AfCFTA) is a game-changer. As intra-African trade increases, so too will the demand for air cargo and passenger services. We are already seeing airlines respond by adding regional routes and increasing frequencies.

<h2>Infrastructure Challenges</h2>

Despite the positive outlook, significant infrastructure challenges remain. Several major airports in the region are operating at or beyond capacity, and air navigation services require modernisation to handle growing traffic volumes.

However, there are encouraging developments. New terminal projects in Accra, Lagos, and Abidjan will add significant capacity over the next three years. Private sector participation in airport infrastructure is also increasing, bringing much-needed investment and operational expertise.

<h2>Investment Opportunities</h2>

For investors, the West African aviation market offers compelling opportunities across the value chain. Aircraft leasing, maintenance facilities, ground handling services, and aviation training are all areas where demand exceeds supply.

The key to success in this market is partnership. International investors who partner with local operators, understand the regulatory environment, and commit for the long term will find West Africa one of the most rewarding aviation markets in the world.

The message to the global aviation community is clear: West Africa is open for business, and the time to engage is now.`,
    image: images.wingWindow,
    author: { name: "Press Team", avatar: "" },
    date: "Mar 2026",
    readTime: "6 min read",
    tags: ["Interview", "Markets"],
  },
  {
    slug: "sustainable-aviation-fuel-realities",
    title: "Sustainable Aviation Fuel: Realities & Roadmap",
    excerpt:
      "A practical assessment of SAF adoption timelines, infrastructure requirements, and cost trajectories for airlines.",
    content: `Sustainable Aviation Fuel has captured the imagination of the industry and the attention of policymakers worldwide. But as with any transformative technology, the gap between aspiration and reality requires careful navigation.

<h2>Current State of SAF Production</h2>

Global SAF production in 2026 is approximately 2 million tonnes annually, representing less than 0.5% of total jet fuel consumption. While this represents significant growth from virtually zero five years ago, it falls far short of the industry's net-zero ambitions.

The constraints are primarily on the supply side. Feedstock availability, production capacity, and cost remain the three critical barriers to SAF scaling. Current production costs are 2-4 times higher than conventional jet fuel, making SAF economically challenging without policy support.

<h2>Production Pathways</h2>

Several production pathways exist, each with different cost profiles, feedstock requirements, and scalability characteristics:

HEFA (Hydroprocessed Esters and Fatty Acids) is the most mature technology, accounting for the majority of current SAF production. However, feedstock constraints limit its ultimate scalability.

ATJ (Alcohol-to-Jet) offers a promising alternative, particularly as cellulosic ethanol production scales. The Fischer-Tropsch pathway, using municipal solid waste or agricultural residues, has the greatest long-term potential but requires the most capital investment.

<h2>Practical Recommendations for Airlines</h2>

For airlines navigating the SAF transition, I recommend a three-pronged approach: secure offtake agreements today to lock in supply, invest in efficiency measures to reduce fuel consumption independent of SAF availability, and engage with policymakers to support production incentives.

The pathway to net-zero aviation will be long and complex, but the direction is clear. Airlines that start their SAF journey today will be better positioned to manage the transition than those that wait for the technology to mature.

Sustainable aviation is not an option — it is an imperative. The question is not whether the industry will transform, but how quickly and how efficiently.`,
    image: images.wingAbove,
    author: { name: "Richard Kyereh", avatar: "" },
    date: "Mar 2026",
    readTime: "5 min read",
    tags: ["Sustainability", "Fuel"],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
