// import React, { useState, useEffect } from "react";
// import supabase from "../../supabase";

// function trySupabase() {
//   const [fetchError, setFetchError] = useState(null);
//   const [School, setSchool] = useState([]);

//   useEffect(() => {
//     const fetchSchool = async () => {
//       const { data, error } = await supabase.from("School").select();

//       if (error) {
//         setFetchError("Could not fetch the School");
//         setSchool([]);
//         console.log(error);
//       }

//       if (data) {
//         setSchool(data);
//         setFetchError(null);
//       }
//     };

//     fetchSchool();
//   }, []);

//   return (
//     <>
//       {fetchError && <p>{fetchError}</p>}
//       {School && (
//         <div className="School">
//           {School.map((school) => (
//             <p key={school.id}>{school.schoolname}</p>
//           ))}
//         </div>
//       )}
//     </>
//   );
// }

// export default trySupabase;

import React from 'react'

function trySupabase() {
  return (
    <div>trySupabase</div>
  )
}

export default trySupabase