import { Heading , Image } from "@chakra-ui/react";
import { useNavigate , Link } from "react-router-dom"
import { useEffect,useState } from "react";
import "./navbar.css"
import WebFont from 'webfontloader';
import Swal from 'sweetalert2'
import { BiUserCircle } from 'react-icons/bi';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Login from "../Main/login";
export default function Navbar(){
    const navigate = useNavigate();
    const [loginpop,setloginpop] = useState(false);
    const [user, setIsAuthenticated] = useState(false);
    const [src,setsrc] = useState("");
    const firebaseConfig = {
      apiKey: "AIzaSyCZIGLq4h7LSGeAQDfDU0qTps2A3CyB1HQ",
      authDomain: "free-netflix-68973.firebaseapp.com",
      projectId: "free-netflix-68973",
      storageBucket: "free-netflix-68973.appspot.com",
      messagingSenderId: "850928033805",
      appId: "1:850928033805:web:93f82b17aa4af31812f544",
      measurementId: "G-XELFZ9RXFC"
    };
    firebase.initializeApp(firebaseConfig);
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            if(user.photoURL){
              setsrc(user.photoURL);
            }
            else{
              setsrc("https://i.postimg.cc/7LjQBGFx/icon-5404125-1280.png");
            }
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        });
        return () => {
          unsubscribe();
        };
      }, []);
    useEffect(() => {
        WebFont.load({
          google: {
            families: ['Piedra', 'Chilanka']
          }
        });
       }, []);
      
    const HandelSubmit = (e)=>{
    e.preventDefault();
    if(e.target.SearchText.value === ""){
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Type Something to Search ...',
            showConfirmButton: false,
            timer: 2500
          })
    }
    else{
        navigate(`/search/1/${e.target.SearchText.value}`)
    }
    }
    function navlogout() {
          Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to logout...",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Logout'
          }).then((result) => {
            if (result.isConfirmed) {
                firebase.auth().signOut();
                navigate(`/`);
            }
          })
    }
    function loginpophandel(){
      if(loginpop){
        setloginpop(false);
      }
      else{
        setloginpop(true);
      }
    }
    return(
        <>
        <header>
            <Heading color="red"><Link to="/" style={{fontFamily: 'Piedra'}}>Free Netflix</Link></Heading>
            <ul className="navigaition">
             <li><Link to="/movies">Movies</Link></li>
             <li><Link to="/webseries">Web Series</Link></li>
             <li><Link to="/adult">Adult</Link></li>
             <li><a href="https://www.instagram.com/vijayji1137/" target="_blank" rel="noreferrer">Contact</a></li>
            </ul>
            <form className="search" onSubmit={HandelSubmit}>
             <input type="text" id="SearchText" placeholder="Search..."/>
            </form>
            {user ?<Image src={src} onClick={()=>{navlogout()}} id="usericon" color="red"/>:<BiUserCircle onClick={()=>{loginpophandel()}} className="usericon" color="#9b6262"/>}
        </header>
        {loginpop ?<Login setloginpop={loginpophandel}/>:<></>}
        </>
    )
}