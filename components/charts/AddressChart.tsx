import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Card, CardBody, CardHeader, Spinner, Chip } from "@nextui-org/react";
import { db } from "@/app/api/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

interface AddressData {
  [key: string]: {
    total: number;
    khuddam: number;
    atfal: number;
  };
}

export const AddressChart = () => {
  const [addressData, setAddressData] = useState<AddressData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAddressData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "formSubmissions"));

        const results: AddressData = {};

        // Initialize categories for A, B, C, D, F, H
        ["A", "B", "C", "D", "F", "H"].forEach((letter) => {
          results[letter] = { total: 0, khuddam: 0, atfal: 0 };
        });

        // Process each document
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          const address = data.address?.toString() || "";
          const firstLetter = address.charAt(0).toUpperCase();
          const tanzeemStatus = data.tanzeemStatus?.toLowerCase();

          // Only count addresses that start with our target letters
          if (["A", "B", "C", "D", "F", "H"].includes(firstLetter)) {
            // Increment total for this address category
            results[firstLetter].total += 1;

            // Increment khuddam/atfal count as appropriate
            if (tanzeemStatus === "khuddam") {
              results[firstLetter].khuddam += 1;
            } else if (tanzeemStatus === "atfal") {
              results[firstLetter].atfal += 1;
            }
          }
        });

        setAddressData(results);
      } catch (error) {
        console.error("Error fetching address data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddressData();
  }, []);

  // Prepare data for charts
  const addressLetters = Object.keys(addressData).sort();
  const totalByAddress = addressLetters.map(
    (letter) => addressData[letter].total
  );
  const khuddamByAddress = addressLetters.map(
    (letter) => addressData[letter].khuddam
  );
  const atfalByAddress = addressLetters.map(
    (letter) => addressData[letter].atfal
  );

  // Chart options for address distribution
  const addressBarOptions = {
    chart: {
      id: "address-distribution",
      foreColor: "hsl(var(--nextui-default-800))",
      toolbar: {
        show: false,
      },
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 2,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#0070F3", "#F5A524"],
    stroke: {
      width: 2,
    },
    xaxis: {
      categories: addressLetters,
      labels: {
        style: {
          colors: "hsl(var(--nextui-default-800))",
        },
      },
      title: {
        text: "Address (Blocks)",
        style: {
          color: "hsl(var(--nextui-default-800))",
        },
      },
    },
    yaxis: {
      title: {
        text: "Number of Members",
        style: {
          color: "hsl(var(--nextui-default-800))",
        },
      },
      labels: {
        style: {
          colors: "hsl(var(--nextui-default-800))",
        },
      },
    },
    legend: {
      position: "top" as "top",
      horizontalAlign: "center" as "center",
      labels: {
        colors: "hsl(var(--nextui-default-800))",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: function (value: number) {
          return value + " members";
        },
      },
    },
    grid: {
      borderColor: "hsl(var(--nextui-default-200))",
    },
  };

  const addressBarSeries = [
    {
      name: "Khuddam",
      data: khuddamByAddress,
    },
    {
      name: "Atfal",
      data: atfalByAddress,
    },
  ];

  // Chart options for total distribution pie chart
  const addressPieOptions = {
    chart: {
      id: "address-pie",
      foreColor: "hsl(var(--nextui-default-800))",
      toolbar: {
        show: false,
      },
    },
    labels: addressLetters,
    colors: ["#17C964", "#F31260", "#0070F3", "#7828C8", "#F5A524", "#FF8A65"],
    legend: {
      position: "bottom" as "bottom",
      fontSize: "14px",
      labels: {
        colors: "hsl(var(--nextui-default-800))",
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toFixed(1) + "%";
      },
      style: {
        fontSize: "14px",
        fontWeight: "bold",
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    tooltip: {
      y: {
        theme: "dark",
        formatter: function (value: number) {
          return value + " members";
        },
      },
    },
  };

  // Summary card data
  const renderSummaryCards = () => {
    return addressLetters.map((letter) => {
      const data = addressData[letter];
      const percentage =
        data.total > 0 ? ((data.khuddam * 100) / data.total).toFixed(0) : "0";

      return (
        <Card key={letter} className="bg-default-50 shadow-sm">
          <CardBody className="py-4 px-4">
            <div className="flex justify-between items-center">
              <div>
                <h5 className="text-lg font-semibold">Address {letter}</h5>
                <p className="text-default-500 text-sm">{data.total} members</p>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex gap-2 mb-1">
                  <Chip size="sm" color="primary" variant="flat">
                    {data.khuddam} Khuddam
                  </Chip>
                  <Chip size="sm" color="warning" variant="flat">
                    {data.atfal} Atfal
                  </Chip>
                </div>
                <p className="text-xs text-default-500">
                  {percentage}% Khuddam
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      );
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner color="primary" size="lg" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Stacked bar chart */}
            <Card className="bg-default-50 shadow-lg rounded-2xl">
              <CardHeader className="pb-0 pt-4 px-6 flex-col items-start">
                <h4 className="font-bold text-xl">Address Zone Distribution</h4>
                <p className="text-default-500">
                  Khuddam/Atfal by Golden Villa Blocks
                </p>
              </CardHeader>
              <CardBody>
                <Chart
                  options={addressBarOptions}
                  series={addressBarSeries}
                  type="bar"
                  height={300}
                />
              </CardBody>
            </Card>

            {/* Pie chart */}
            <Card className="bg-default-50 shadow-lg rounded-2xl">
              <CardHeader className="pb-0 pt-4 px-6 flex-col items-start">
                <h4 className="font-bold text-xl">
                  Overall Address Distribution
                </h4>
                <p className="text-default-500">Tajneed by address location</p>
              </CardHeader>
              <CardBody>
                <Chart
                  options={addressPieOptions}
                  series={totalByAddress}
                  type="pie"
                  height={300}
                />
              </CardBody>
            </Card>
          </div>

          {/* Summary cards */}
          <h4 className="font-bold text-lg mt-2">Address Zone Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {renderSummaryCards()}
          </div>
        </>
      )}
    </div>
  );
};

export default AddressChart;
