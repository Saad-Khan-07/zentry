import { useEffect, useRef, useState } from "react"
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import gsap from "gsap";

const navItems= ['Nexus', 'Vault', 'Prologue', 'About', 'Contact']

export default function Navbar() {

    const[isAudioPlaying, setIsAudioPlaying]= useState(false);
    const[isIndicatorActive,setIndicatorActive]= useState(false);
    const NavContainerRef= useRef(null);
    const audioElementRef= useRef(null);
    const [lastScrollY, setLastScrollY]= useState(0);
    const [isNavVisible, setIsNavVisible] = useState(true)    

    const toggleAudioIndicatior=()=>{
        setIsAudioPlaying((prev)=> !prev);
        setIndicatorActive((prev)=> !prev);
    }

    const {y : currentScrollY} = useWindowScroll();

    useEffect(()=>{
        if(currentScrollY===0){
            setIsNavVisible(true)
            NavContainerRef.current.classList.remove('floating-nav');  //target a particular class element
        }
        else if(currentScrollY > lastScrollY){
            setIsNavVisible(false);
            NavContainerRef.current.classList.add('floating-nav');  //target a particular class element
        }
        else if(currentScrollY < lastScrollY){
            setIsNavVisible(true);
            NavContainerRef.current.classList.add('floating-nav');  //target a particular class element
        }

        setLastScrollY(currentScrollY);
    }, [currentScrollY,lastScrollY])

    useEffect(()=>{
        gsap.to(NavContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.2
        })
    },[isNavVisible])

    useEffect(()=>{
        if(isAudioPlaying){
        audioElementRef.current.play();
        }
        else{
            audioElementRef.current.pause();
        }
    },[isAudioPlaying])

    return (
    <div ref={NavContainerRef} className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6">
    <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4 ">
            <div className="flex items-center gap-7">
                <img src="/img/logo.png" alt="logo" className="w-10"/>
                <Button id="product-button" title='products' rightIcon={<TiLocationArrow/>} 
                    containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
                />
            </div>
            <div className="flex h-full items-center">
                <div className="hidden md:block">
                    {navItems.map((item)=>(
                        <a key={item} className="nav-hover-btn" href={`#${item.toLowerCase()}`}>{item}</a>
                    ))}
                </div>
                <button className="ml-10 flex items-center space-x-0.5" onClick={toggleAudioIndicatior}>
                    <audio ref={audioElementRef} className="hidden" src="/audio/loop.mp3" loop/>
                        {[1,2,3,4].map((bar)=>(
                            <div key={bar} className={`indicator-line ${isIndicatorActive ? 'active' : ''}`} 
                            style={{animationDelay:`${bar*0.1}`}}/>
                            
                        ))}
                    
                </button>
            </div>
        </nav>
    </header>
      
    </div>
  )
}
