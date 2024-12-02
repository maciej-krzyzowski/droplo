import { NavigationForm } from "@/components/NavigationForm";

const Home = () => {
  return (
    <main className="min-h-screen py-4">
      <div className="mx-auto w-full max-w-[1168px] px-4">
        <h1>strona główna</h1>

        <NavigationForm />
      </div>
    </main>
  );
};

export default Home;
