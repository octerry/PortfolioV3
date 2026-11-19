import HomepageHeader from "@/components/homepage-header";
import HomepageSubsection from "@/components/homepage-subsection";
import UsernameModal from "@/components/username-modal";
import "@/styles/homepage.css"

export default function Home() {
  return (
    <div>
        <header>
            <UsernameModal/>
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
