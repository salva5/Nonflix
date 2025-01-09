import styles from "./Users.module.css";
import {
   Card,
   Title,
   Table,
   TableHead,
   TableRow,
   TableBody,
   TableCell,
   Button,
} from "@tremor/react";
import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";
import {
   getUsers,
   disableEnableUsers,
   disableEnableUsersAdmin,
} from "../../Redux/actions/actions";
import { useEffect, useState } from "react";

const Users = () => {
   const dispatch = useDispatch();   

   useEffect(() => {
      dispatch(getUsers());
   }, []);

   const users = useSelector((state) => state.allUsers);
   const userToken = useSelector((state) => state.user);

  // Enable en disabled Users
   const handleDisabled = (id, active) => {
      dispatch(disableEnableUsers(id, userToken.token, active));
      Swal.fire({
         position: "top-end",
         title: "Great!",
         text: "The action activate User was successful!",
         icon: "success",
         showConfirmButton: false,
         backdrop: false,
         timer: 2000,
         customClass: {
         popup: "small-alert",
         },
      });
   };

  // Enable en disabled Admin Users
   const handleDisabledAdmin = (id, admin) => {
      dispatch(disableEnableUsersAdmin(id, userToken.token, admin));
      Swal.fire({
         position: "top-end",
         title: "Great!",
         text: "The action activate Admin User was successful!",
         icon: "success",
         showConfirmButton: false,
         backdrop: false,
         timer: 2000,
         customClass: {
         popup: "small-alert",
         },
      });
   };

   return (
      <>
         <div className={styles.users}>
            <Card className="ml-8 bg-gray-800 static" style={{minHeight:"100vh"}}>
               <Title className="text-center text-xl text-teal-400 pt-5">
                  Registered Users
               </Title>
               <Table className="p-6">
                  <TableHead>
                     <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Number of Reviews</TableCell>
                        <TableCell>Purchases</TableCell>
                        <TableCell>Admin</TableCell>
                        <TableCell>Profile Image</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell>User Activate</TableCell>
                        <TableCell>Activate Admin</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {users?.map((user) => (
                        <TableRow key={user.name}>
                           <TableCell>{user.name}</TableCell>
                           <TableCell>{user.email}</TableCell>
                           <TableCell>{user.reviews}</TableCell>
                           <TableCell>{user.purchases}</TableCell>
                           <TableCell>{`${user.admin}`}</TableCell>
                           <TableCell>
                              <img className={styles.sizeImage} src={user.image}></img>
                           </TableCell>
                           <TableCell>{`${user.active}`}</TableCell>
                           <TableCell>
                              {user.active ? (
                                 <Button
                                    className="hover:text-green-500"
                                    onClick={() => handleDisabled(user.id, user.active)}
                                    size="xs"
                                 >
                                    Disable
                                 </Button>
                              ) : (
                                 <Button
                                    className="hover:text-red-500"
                                    onClick={() => handleDisabled(user.id, user.active)}
                                    size="xs"
                                 >
                                    Enable
                                 </Button>
                              )}
                           </TableCell>

                           <TableCell>
                              {user.admin ? (
                                 <Button
                                    className="hover:text-green-500"
                                    onClick={() => handleDisabledAdmin(user.id, user.admin)}
                                    size="xs"
                                 >
                                    Disable
                                 </Button>
                              ) : (
                                 <Button
                                    className="hover:text-red-500"
                                    onClick={() => handleDisabledAdmin(user.id, user.admin)}
                                    size="xs"
                                 >
                                    Enable
                                 </Button>
                              )}
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </Card>
            </div>
      </>
   );
};
export default Users;
