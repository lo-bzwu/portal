import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <main className="text-primary" style={{ padding: "24px" }}>
        <h1>Dokumentation des LO-Portals</h1>
        <a href="./docs/intro">Zur Dokumentation</a>
      </main>
    </Layout>
  );
}
