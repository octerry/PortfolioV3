import HomepageHeader from "@/components/homepage-header";
import HomepageSubsection from "@/components/homepage-subsection";
import "@/styles/homepage.css"

export default function Home() {
  return (
    <div>
        <header>
            <HomepageHeader/>
        </header>
        <main id="homepage-main">
            <HomepageSubsection title="Morpions" src="/tic-tac-toe-illustration.png" />
            <HomepageSubsection title="Morpions" src="/tic-tac-toe-illustration.png" />
            <HomepageSubsection title="Morpions" src="/tic-tac-toe-illustration.png" />
            <HomepageSubsection title="Morpions" src="/tic-tac-toe-illustration.png" />
            <HomepageSubsection title="Morpions" src="/tic-tac-toe-illustration.png" />
            <HomepageSubsection title="Morpions" src="/tic-tac-toe-illustration.png" />
        </main>
    </div>
  );
}
