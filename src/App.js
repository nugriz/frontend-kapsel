/* global google */
import React, { useState, useEffect } from 'react'; 
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
  
const App = () => { 
    const [user, setUser] = useState('');
  
    useEffect(() => { 
  
        //Implementing the setInterval method
        const interval = setInterval(() => { 
            const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
            };
            
            function success(pos) {
            const crd = pos.coords;
            
            console.log("Your current position is:");
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
            }
            
            function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
            }
            
            navigator.geolocation.getCurrentPosition(success, error, options);              
        }, 10000); 
  
        //Clearing the interval 
        return () => clearInterval(interval); 
    }, []); 

    // Login Func
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    //const [isSubmitted, setIsSubmitted] = useState(true);

    // User Login info

    const database = [
      {
        nim: '18119035',
        nama: 'Rizki Nugraha'
      },
      {
        nim: '18119009',
        nama: 'Geo Perdana S.'
      }
    ]

    // const database = [
    //     {
    //     username: "user1",
    //     password: "pass1"
    //     },
    //     {
    //         username: "admin",
    //         password: "admin"
    //         },
    //     {
    //     username: "user2",
    //     password: "pass2"
    //     }
    // ];

    const errors = {
        uname: "invalid nim",
        pass: "invalid password"
    };

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        var nim = document.getElementsByName("nim")[0];

        // Find user login info
        const userData = database.find((user) => user.nim === nim.value);

        // Compare user info
        if (userData) {
          setIsSubmitted(true);
          setUser(userData.nama)
        } else {
        // Username not found
        setErrorMessages({ name: "nim", message: errors.uname });
        }
    };

  //   const handleSubmit = (event) => {
  //     //Prevent page reload
  //     event.preventDefault();

  //     var { uname, pass } = document.forms[0];

  //     // Find user login info
  //     const userData = database.find((user) => user.username === uname.value);

  //     // Compare user info
  //     if (userData) {
  //     if (userData.password !== pass.value) {
  //         // Invalid password
  //         setErrorMessages({ name: "pass", message: errors.pass });
  //     } else {
  //         setIsSubmitted(true);
  //         setUser(uname.value)
  //     }
  //     } else {
  //     // Username not found
  //     setErrorMessages({ name: "uname", message: errors.uname });
  //     }
  // };

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
        <div className="error">{errorMessages.message}</div>
        );

    // JSX code for login form
    // const renderForm = (
    //     <div className="form">
    //     <form onSubmit={handleSubmit}>
    //         <div className="input-container">
    //         <label>Username </label>
    //         <input type="text" name="uname" required />
    //         {renderErrorMessage("uname")}
    //         </div>
    //         <div className="input-container">
    //         <label>Password </label>
    //         <input type="password" name="pass" required />
    //         {renderErrorMessage("pass")}
    //         </div>
    //         <div className="button-container">
    //         <input type="submit" />
    //         </div>
    //     </form>
    //     </div>
    // );

    const renderForm = (
      <div className='form'>
        <form onSubmit={handleSubmit}>
          <div style={{borderColor: 'white'}}>
            <label style={{color: "white", fontWeight: '500'}}>NIM</label>
            <input style={{borderColor: 'white',borderRadius: "20em", marginTop: '7%', marginLeft: "1%"}} type='text' name="nim" required />
            {renderErrorMessage('nim')}
            <input style={{background: "white",borderColor: 'white', marginLeft: "2%", borderRadius: "20em"}} type='submit' />
          </div>
        </form>
      </div>
    )

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyCxcV8F2YVP9WCIlpCF-aQCIOHCgx4pqUs',
      });
      const markers = [
        { lat: 18.5209, lng: 73.8537 },
        { lat: 18.5314, lng: 73.8446 },
        { lat: 18.5642, lng: 73.7769 },
      ];
    
      const onLoad = (map) => {
        const bounds = new window.google.maps.LatLngBounds();
        markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
        map.fitBounds(bounds);
      };

    // styling
    const table = {
      borderCollapse: 'collapse',
      margin: '25px 0',
      fontSize: '0.9em',
      fontFamily: 'Rubik sans-serif',
      minWidth: '400px',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.15)',
      backgroundColor: '#009879',
      color: '#ffffff',
      textAlign: 'left',
      fontStyle: 'normal',
      fontVariantCaps: 'normal',
      fontVariantEastAsian: 'normal',
      fontVariantLigatures: 'normal',
      fontVariantNumeric: 'normal',
      fontWeight: '1000'
    }

    const table2 = {
      backgroundColor: '#FF4F4F',
      color: '#ffffff',
      textAlign: 'left'
    }

    const quests = ['ayo jalan-jalan!', 'ayo ngampus!', 'ayo olahraga!']


    if (false) {
        while (!isSubmitted) {
            return <div className="app">
                        <div className="login-form">
                        <div className="title">Sign In</div>
                        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
                        </div>
                    </div>
        }
    } else {
        if (user=='admin') {
            console.log('admin')
            return (
                <div className="Apps" style={{width: '100vw', height: '100vh'}}>
                  {!isLoaded ? (
                    <h1>Loading...</h1>
                  ) : (
                    <GoogleMap mapContainerStyle={{height: '100%'}} onLoad={onLoad}>
                      {markers.map(({ lat, lng }) => (
                        <MarkerF position={{ lat, lng }} />
                      ))}
                    </GoogleMap>
                  )}
                </div>
              );
        } else {
            return <div style={{backgroundColor: '#FF4F4F'}}>
                    <div style={{textAlign: 'center', boxShadow: '2px 2px 6px 2px #888888', backgroundColor: '#E0352E', top: '10%', left: '5%', borderRadius: '25em', zIndex: '1', position: 'fixed', width: '90%', height: "10vh"}}>
                      {isSubmitted ?
                      <h3 style={{color: 'white'}}>{user}
                        <div style={{boxShadow: '1px 1px 1px 1px gold', borderRadius: '8em',position: 'fixed', width: '20%', height: '8%', background: 'white', top: '11%', left: '73%'}}>
                          <h5 style={{color: '#E0352E', position: 'fixed', top: '7%', right: '13%'}}>XP</h5>
                          <h5 style={{color: "gold"}}>100</h5>
                        </div>
                      </h3> : renderForm }
                    </div>
                    <div style={{backgroundColor: '#009879'}}>
                      <GoogleMap mapContainerStyle={{height: '75%'}} onLoad={onLoad} zoom={17} center={{ lat: -6.889547, lng: 107.610360 }}>
                                <MarkerF position={{ lat: -6.889547, lng: 107.610360 }} />
                      </GoogleMap>
                    </div>
                    <div style={{boxShadow: '0px 10px 10px 15px #888888', height: '65vh', backgroundColor: '#FF4F4F', top: '70%', position: "absolute", borderTopLeftRadius: '20px',borderTopRightRadius: '20px', width: '100%'}}>
                    <div style={{boxShadow: '5px 10px 10px 5px', margin: '10%', borderRadius: '20px', backgroundColor: 'white', height: '45vh'}}>
                        <div style={{height: '10px'}}></div>
                        <h3 style={{textAlign: 'center', margin: 'auto'}}>Quest & Mission</h3>
                        {quests.map((quest)=>(
                          <div style={{textAlign: 'center'}}>
                            <div style={{height: '10px'}}></div>
                            <button style={{borderColor: 'white',boxShadow: '2px 2px 2px 2px #888888',backgroundColor: "white", borderRadius: '10px', width:'70%'}} onClick={console.log('')}><h4>{quest}</h4></button>
                          </div>
                        ))}
                      </div>
                      <div style={{paddingTop: '10%', backgroundColor: 'black', height: "10vh", color: 'white', textAlign: 'center'}}> Made with love by Kelompok 4</div>
                  </div>
        </div>;    
        }   
    }
} 
  
export default App;
