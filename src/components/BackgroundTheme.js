import React, { useState, useEffect } from 'react';

const BackgroundTheme = () => {
 const [isDay, setIsDay] = useState(true);

 // Check if it's daytime in EST
 useEffect(() => {
   const checkTime = () => {
     const now = new Date();
     // Convert to EST
     const estTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
     const hours = estTime.getHours();
     setIsDay(hours >= 6 && hours < 18);
   };

   checkTime(); // Initial check
   const interval = setInterval(checkTime, 60000); // Check every minute

   return () => clearInterval(interval);
 }, []);

 return (
   <div className="fixed inset-0 -z-10 transition-colors duration-1000"
        style={{ backgroundColor: isDay ? '#e6f3ff' : '#1a237e' }}>
     
     {/* Day Sky Elements */}
     {isDay && (
       <>
         {/* Kawaii Sun */}
         <div className="absolute right-10 top-10 animate-float">
           <svg width="200" height="200" viewBox="0 0 200 200">
             {/* Sun glow effect */}
             <circle cx="100" cy="100" r="90" fill="#FFD700" opacity="0.3">
               <animate attributeName="r" values="90;95;90" dur="4s" repeatCount="indefinite" />
             </circle>
             
             {/* Main sun body */}
             <circle cx="100" cy="100" r="60" fill="#FFD700" />
             
             {/* Kawaii face */}
             <g transform="translate(100 100)">
               {/* Eyes */}
               <circle cx="-20" cy="-10" r="6" fill="#000" />
               <circle cx="20" cy="-10" r="6" fill="#000" />
               
               {/* Rosy cheeks */}
               <circle cx="-30" cy="10" r="7" fill="#FFB6C1" opacity="0.5" />
               <circle cx="30" cy="10" r="7" fill="#FFB6C1" opacity="0.5" />
               
               {/* Happy mouth */}
               <path d="M-20,15 Q0,35 20,15" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" />
             </g>
             
             {/* Sun rays */}
             {[...Array(12)].map((_, i) => (
               <line
                 key={i}
                 x1="100"
                 y1="100"
                 x2={100 + Math.cos(i * Math.PI / 6) * 85}
                 y2={100 + Math.sin(i * Math.PI / 6) * 85}
                 stroke="#FFD700"
                 strokeWidth="4"
                 opacity="0.6"
               >
                 <animate
                   attributeName="opacity"
                   values="0.6;0.8;0.6"
                   dur="2s"
                   begin={`${i * 0.2}s`}
                   repeatCount="indefinite"
                 />
               </line>
             ))}
           </svg>
         </div>

         {/* Kawaii Clouds */}
         <div className="absolute left-10 top-20 animate-float-slow">
           <svg width="150" height="100" viewBox="0 0 150 100">
             <path
               d="M25,60 Q37.5,45 50,60 Q62.5,40 75,60 Q87.5,45 100,60 Q112.5,40 125,60 Q125,80 75,80 Q25,80 25,60"
               fill="#FFF"
               opacity="0.9"
             />
             {/* Kawaii face */}
             <g transform="translate(75 65)">
               <circle cx="-15" cy="0" r="3" fill="#000" />
               <circle cx="15" cy="0" r="3" fill="#000" />
               <path d="M-10,10 Q0,15 10,10" fill="none" stroke="#000" strokeWidth="2" />
             </g>
           </svg>
         </div>
       </>
     )}

     {/* Night Sky Elements */}
     {!isDay && (
       <>
         {/* Kawaii Moon */}
         <div className="absolute right-10 top-10 animate-float">
           <svg width="200" height="200" viewBox="0 0 200 200">
             {/* Moon glow */}
             <circle cx="100" cy="100" r="70" fill="#E1E7FF" opacity="0.2">
               <animate attributeName="r" values="70;75;70" dur="4s" repeatCount="indefinite" />
             </circle>
             
             {/* Main moon body */}
             <path
               d="M100,40 a60,60 0 1,1 0,120 a45,60 0 1,0 0,-120"
               fill="#E1E7FF"
             />
             
             {/* Kawaii face */}
             <g transform="translate(80 100)">
               {/* Sleepy eyes */}
               <path d="M-20,-10 Q-15,-15 -10,-10" stroke="#000" strokeWidth="3" fill="none" />
               <path d="M20,-10 Q15,-15 10,-10" stroke="#000" strokeWidth="3" fill="none" />
               
               {/* Rosy cheeks */}
               <circle cx="-25" cy="10" r="5" fill="#FFB6C1" opacity="0.3" />
               <circle cx="25" cy="10" r="5" fill="#FFB6C1" opacity="0.3" />
               
               {/* Gentle smile */}
               <path d="M-15,15 Q0,20 15,15" fill="none" stroke="#000" strokeWidth="3" />
             </g>
           </svg>
         </div>

         {/* Stars */}
         {[...Array(20)].map((_, i) => (
           <div
             key={i}
             className="absolute animate-twinkle"
             style={{
               left: `${Math.random() * 100}%`,
               top: `${Math.random() * 60}%`,
               animationDelay: `${Math.random() * 3}s`
             }}
           >
             <svg width="10" height="10" viewBox="0 0 10 10">
               <circle cx="5" cy="5" r="2.5" fill="#FFF" />
             </svg>
           </div>
         ))}
       </>
     )}
   </div>
 );
};

export default BackgroundTheme;
