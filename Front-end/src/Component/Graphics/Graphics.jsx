import {
   Card,
   BarChart,
   BarList,
   Title,
   Text,
   Metric,
   Flex,
   Bold,
   DonutChart,
} from "@tremor/react";
import { useDispatch, useSelector } from "react-redux";
import {
   getBestfavorites,
   getBestsellers,
   getSalesByDate,
} from "../../Redux/actions/actions";
import { useEffect, useState } from "react";

const Graphics = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getBestsellers());
      dispatch(getBestfavorites());
      dispatch(getSalesByDate());
   }, []);

   const { bestsellers, bestfavorites, salesByDate } = useSelector(
      (state) => state
   );

   let totalSales = salesByDate.reduce((accumulator, currentItem) => {
      return accumulator + currentItem['Total by date'];
   }, 0);

  const salesByMovie = bestsellers.map(movie=> { return {name: movie.name, value: +(+movie.value * 1749.66).toFixed(2)}})

   const valueFormatter = (number) =>
      `$ ${new Intl.NumberFormat("us").format(number).toString()}`;

   return (
      <>
         <div className="dashboard">
            <Card className=" ml-8 bg-gray-800 static p-5">
               <Title className="text-center text-xl text-teal-400 pt-5">Graphics</Title>
               <div className="flex p-6 mt-5">
                  <Card
                     className="max-w-xs justify-center mx-auto flex flex-col items-center justify-center"
                     decoration="top"
                     decorationColor="teal"
                  >
                     <Text className="text-xl mx-auto text-center">Total Sales</Text>
                     <Metric className="mx-auto text-center">$ {totalSales}</Metric>
                  </Card>
                  <Card
                     className="max-w-xs mx-auto"
                     decoration="top"
                     decorationColor="teal"
                  >
                     <Title>Sales by bestsellers</Title>
                     <DonutChart
                        className="mt-6"
                        data={salesByMovie}
                        category="value"
                        index="name"
                        colors={[
                           "slate",
                           "violet",
                           "indigo",
                           "rose",
                           "cyan",
                           "amber",
                        ]}
                        valueFormatter={valueFormatter}
                     ></DonutChart>
                  </Card>
               </div>
               <br></br>
               <Card>
                  <Title>Bestsellers</Title>
                  <Flex>
                  <Text>
                     <Bold>Movie</Bold>
                  </Text>
                  <Text>
                     <Bold>Times purchased</Bold>
                  </Text>
                  </Flex>
                  <BarList color={["teal"]} data={bestsellers} className="mt-2" />
               </Card>
               <br></br>
               <Card>
                  <Title>Favorite Movies</Title>
                  <Flex>
                  <Text>
                     <Bold>Movie</Bold>
                  </Text>
                  <Text>
                     <Bold>Actual total of clients who has it as favorite</Bold>
                  </Text>
                  </Flex>
                  <BarList color={["teal"]} data={bestfavorites} className="mt-2" />
               </Card>
               <br></br>
               <Card>
                  <Title>Sales by date</Title>
                  <BarChart
                  className="mt-6"
                  data={salesByDate}
                  index="Date"
                  categories={["Total by date"]}
                  colors={["teal"]}
                  yAxisWidth={68}
                  valueFormatter={valueFormatter}
                  ></BarChart>
               </Card>
               <br></br>
            </Card>
         </div>
      </>
   );
};
export default Graphics;
