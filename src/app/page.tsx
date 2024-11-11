import HomeHeader from "@/components/HomeHeader";
import IntroComp from "@/components/IntroComp";
import UserGuid from "@/components/UserGuid";
export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col gap-5 pt-16">
      <HomeHeader />
      <IntroComp />
      <UserGuid />
    </div>
  );
}