//import "./Users.css";
import style from "./Orders.module.css"
import {
   Card,
   Title,
   Table,
   TableHead,
   TableRow,
   TableBody,
   TableCell,
} from "@tremor/react";

import { useDispatch, useSelector } from "react-redux";
import {
   getOrders,
} from "../../Redux/actions/actions";
import { useEffect } from "react";

const Orders = () => {
   const dispatch = useDispatch();  

   useEffect(() => {
      dispatch(getOrders());
   }, []);

   const {orders} = useSelector((state) => state);
   const valueFormatter = (number) =>
      `$ ${new Intl.NumberFormat("us").format(number).toString()}`;

   return (
      <>
         <div className={style.orders}>
            <Card className=" ml-8 bg-gray-800 static" style={{minHeight:"100vh"}}>
               <Title className="text-center text-xl text-teal-400 pt-5">
                  Orders
               </Title>
               <Table className="p-6">
                  <TableHead>
                     <TableRow>
                     <TableCell>Client email</TableCell>
                     <TableCell>Order Id</TableCell>
                     <TableCell>Status</TableCell>
                     <TableCell>Quantity</TableCell>
                     <TableCell >Total</TableCell>
                     
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {orders?.map((order) => (
                     <TableRow key={order.mercadoPagoId}>
                        <TableCell>{order.User.email}</TableCell>
                        <TableCell>{order.mercadoPagoId}</TableCell>
                        <TableCell>{order.status}</TableCell>
                        <TableCell>{order.articlesQt}</TableCell>
                        <TableCell valueFormatter={valueFormatter}>{`$${order.total} ARG`}</TableCell>
                        
                     </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </Card>
         </div>
      </>
   );
};
export default Orders;
