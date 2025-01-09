import {
   Card,
   TabGroup,
   TabPanels,
   TabPanel,
   Button,
   Title,
   Table,
   TableHead,
   TableRow,
   TableHeaderCell,
   TableBody,
   TableCell,
   TextInput,
} from "@tremor/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
   disableEnableMovies,
   getBestfavorites,
   getBestsellers,
   getMovies,
   getSalesByDate,
   getUsers,
} from "../../Redux/actions/actions";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./DashBoard.css"

const DashBoard = () => {
   const dispatch = useDispatch();
   const moviesPerPage = 10;
   const [currentPage, setCurrentPage] = useState(1);
   const [searchTerm, setSearchTerm] = useState("");
   const [isSearchActive, setIsSearchActive] = useState(false);
   
   useEffect(() => {
      dispatch(getMovies());
   }, []);

   const movies = useSelector((state) => state.Allmovies);
   
   const [display, setDisplay] = useState([]);

    
   useEffect(() => {
      if (searchTerm) {
         const filteredMovies = movies.filter((movie) =>
         movie.title.toLowerCase().includes(searchTerm.toLowerCase())
         );
         setDisplay(filteredMovies.slice(0, currentPage * moviesPerPage));
      } else {
         setDisplay(movies.slice(0, currentPage * moviesPerPage));
      }
   }, [movies, currentPage, searchTerm]);

   const handleChange = (e) => {
      const newSearchTerm = e.target.value;
      setSearchTerm(newSearchTerm);
      if (newSearchTerm) {
         setIsSearchActive(true);
      } else {
         setIsSearchActive(false);
      }
   };

   const loadMore = () => {
      if (!isSearchActive) {
         setCurrentPage(currentPage + 1);
      }
   };
   const handleDisabled = (id, disabled) => {
      dispatch(disableEnableMovies(id, disabled));
      Swal.fire({
         position: "top-end",
         title: "Great!",
         text: "The action was successful!",
         icon: "success",
         showConfirmButton: false,
         backdrop: false,
         timer: 2000,
         customClass: {
         popup: "small-alert",
         },
      });
      // setSearchTerm("")
   };

   return (
      <>  
         <div className="dashboard">
            <Card className=" dashboard-card bg-gray-800 position-static rounded-0">
               <Title className="text-center text-xl text-teal-400 mt-5">
                  Admin Dashboard
               </Title>
               <TabGroup>
                  <TabPanels>
                  <TabPanel>
                     <Card>
                        <div className="p-4">
                           <Title className="text-decoration-none">List of Movies</Title>
                           <div className="d-flex justify-content-between">
                              <TextInput
                                 className="w-60 search"
                                 onChange={handleChange}
                                 placeholder="Search a Movie..."
                              ></TextInput>
                              <Link to="/PostMovie" className="pe-12">
                                 <Button className="w-40">Create a New Movie</Button>
                              </Link>
                           </div>
                        </div>
                        <br></br>
                        <Table>
                           <TableHead>
                              <TableRow>
                                 <TableHeaderCell>Title</TableHeaderCell>
                                 <TableHeaderCell>Duration</TableHeaderCell>
                                 <TableHeaderCell>Year</TableHeaderCell>
                                 <TableHeaderCell>Lang</TableHeaderCell>
                                 <TableHeaderCell>State</TableHeaderCell>
                                 <TableHeaderCell>Actions</TableHeaderCell>
                              </TableRow>
                           </TableHead>
                           <TableBody>
                              {display?.map((movie) => (
                                 <TableRow key={movie.id}>
                                    <TableCell>
                                       <Link to={`/Detail/${movie.id}`} className="text-decoration-none name">
                                          <p className="hover:text-teal-600">
                                             {movie.title}
                                          </p>
                                       </Link>
                                    </TableCell>
                                    <TableCell>{movie.duration}min</TableCell>
                                    <TableCell>{movie.year}</TableCell>
                                    <TableCell>{movie.language}</TableCell>
                                    <TableCell>
                                       {movie.disabled ? "Disabled" : "Enabled"}
                                    </TableCell>
                                    <TableCell className="actions">
                                       <Link to={`/uploadMovie/${movie.id}`}>
                                          <Button size="xs">Edit</Button>
                                       </Link>
                                       {
                                          movie.disabled 
                                             ? (<Button
                                                   className="hover:text-green-500"
                                                   onClick={() =>
                                                      handleDisabled(movie.id, movie.disabled)
                                                   }
                                                   size="xs"
                                                >
                                                   Enable
                                                </Button>
                                             ) 
                                             : (<Button
                                                   className="hover:text-red-500"
                                                   onClick={() =>
                                                      handleDisabled(movie.id, movie.disabled)
                                                   }
                                                   size="xs"
                                                >
                                                   Disable
                                                </Button>
                                             )
                                       }
                                    </TableCell>
                                 </TableRow>
                              ))}
                           </TableBody>
                        </Table>
                     </Card>
                     <br></br>
                     <button onClick={loadMore}>Load more users...</button>
                  </TabPanel>
                  
                  
                  </TabPanels>
               </TabGroup>
            </Card>
         </div>
      </>
   );
};
export default DashBoard;
