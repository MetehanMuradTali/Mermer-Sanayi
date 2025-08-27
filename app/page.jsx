import { getMarbles } from "@/actions/getMarbles"
import Contact from "@/components/user/main/contact/Contact";
import Footer from "@/components/user/main/footer/Footer";
import Location from "@/components/user/main/location/Location";
import Marbles from "@/components/user/main/marbles/Marbles";
import Navbar from "@/components/user/main/navbar/Navbar";
import Store from "@/components/user/main/store/Store";
import { assets } from "@/assets/assets";
import Image from "next/image";

export default async function Home() {
   const res = await getMarbles();

    return (<div className="relative" id={"top"}>
        {/*navbar*/}
        <Navbar/>
        {/*dükkan*/}
        <Store/>
        {/*ürünler*/}
        <Marbles  marbles={res}/>
        {/*iletişim*/}
        <Contact/>
        {/*googlemap*/}
        <Location/>
        {/*footer*/}
        <Footer />
        {/*Go to Top*/}
        <a href={"#top"} className="fixed w-[36px] h-[36px] sm:w-[48px] sm:h-[48px] right-[10px] bottom-[100px] sm:right-[60px] sm:bottom-[100px] opacity-70">
            <Image src={assets.upArrow} fill alt="upArrow"/>
        </a>
    </div>)

}

