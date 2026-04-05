import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const Overview = () => {
  const statistics = [
    { title: "Total Products", value: 320 },
    { title: "Total Orders", value: 1500 },
    { title: "Completed Transactions", value: 1400 },
    { title: "Total Users", value: 1200 },
    // { title: "Active Users", value: 950 },
  ];

  const deliveryData = [
    { name: "Completed", value: 380 },
    { name: "Pending", value: 120 },
  ];

  const orderActivityData = [
    { name: "Jan", orders: 120 },
    { name: "Feb", orders: 150 },
    { name: "Mar", orders: 200 },
    { name: "Apr", orders: 180 },
    { name: "May", orders: 220 },
    { name: "Jun", orders: 250 },
    { name: "Jul", orders: 300 },
    { name: "Aug", orders: 280 },
    { name: "Sep", orders: 320 },
    { name: "Oct", orders: 350 },
    { name: "Nov", orders: 400 },
    { name: "Dec", orders: 450 },
  ];

  const userData = [
    { name: "Active Users", value: 950 },
    { name: "Inactive Users", value: 250 },
  ];

  const orderData = [
    { name: "Completed", value: 1200 },
    { name: "Pending", value: 300 },
  ];

  const COLORS = ["#00C49F", "#FFBB28"];

  return (
    <div>
      <div>
        <div className="page-title flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold">Overview</h2>
          </div>
          <div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statistics.map((stat, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded p-4 text-center"
            >
              <h3 className="text-lg font-semibold">{stat.title}</h3>
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Pie Charts Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Delivery Status Pie Chart */}
          <div className="bg-white shadow-md rounded p-4">
            <h3 className="text-lg font-semibold mb-4">Delivery Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deliveryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                >
                  {deliveryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* User Statistics Pie Chart */}
          <div className="bg-white shadow-md rounded p-4">
            <h3 className="text-lg font-semibold mb-4">User Statistics</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                >
                  {userData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white shadow-md rounded p-4">
            <h3 className="text-lg font-semibold mb-4">Order Statistics</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                >
                  {userData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Activity Bar Chart */}
        <div className="bg-white shadow-md rounded p-4 mb-8">
          <h3 className="text-lg font-semibold mb-4">Order Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={orderActivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#3474dd" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Transactions Table */}
        <div className="bg-white shadow-md rounded p-4 mb-8">
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Transaction ID</th>
                <th className="border p-2 text-left">Amount</th>
                <th className="border p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">TX12345</td>
                <td className="border p-2">$120.00</td>
                <td className="border p-2 text-green-500">Completed</td>
              </tr>
              <tr>
                <td className="border p-2">TX12346</td>
                <td className="border p-2">$75.00</td>
                <td className="border p-2 text-yellow-500">Pending</td>
              </tr>
              <tr>
                <td className="border p-2">TX12347</td>
                <td className="border p-2">$200.00</td>
                <td className="border p-2 text-green-500">Completed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview;
