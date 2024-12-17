import SettingsIcon from "@mui/icons-material/Settings";
import CardInfo from "../../components/CardInfo";
import "./Dashboard.css";
import { ColumnDefinitionType } from "../../components/Table/ColumnDefinitionType";
import CustomeTable from "../../components/Table/CustomeTable";
import { useEffect, useState } from "react";
import requestApi from "../../api/request";
import { Request } from "../../api/types";
const cardProps = () => [
  {
    title: "CPU",
    description: "X/Y - X - số GPU hoạt động / tổng GPU",
    icon: <SettingsIcon />,
  },
  {
    title: "GPU",
    description: "X/Y - X - số GPU hoạt động / tổng GPU",
    icon: <SettingsIcon />,
  },
  {
    title: "SỐ YỀU CẦU CẤP PHÁT ĐANG CHỜ",
    description: "X",
    icon: <SettingsIcon />,
  },
  {
    title: "SỐ YÊU CẦU ĐANG XỬ LÝ ",
    description: "Y",
    icon: <SettingsIcon />,
  },
];
interface Cat {
  name: string;
  age: number;
  gender: string;
  color: string;
  activityLevel?: string;
  favoriteFood?: string;
}
const data: Cat[] = [
  {
    name: "Mittens",
    color: "black",
    age: 2,
    gender: "female",
    activityLevel: "hight",
    favoriteFood: "milk",
  },
  {
    name: "Mons",
    color: "grey",
    age: 2,
    gender: "male",
    favoriteFood: "old socks",
    activityLevel: "medium",
  },
  {
    name: "Luna",
    color: "black",
    age: 2,
    gender: "female",
    activityLevel: "medium",
    favoriteFood: "fish",
  },
  {
    name: "Bella",
    color: "grey",
    age: 1,
    gender: "female",
    activityLevel: "high",
    favoriteFood: "mice",
  },
  {
    name: "Oliver",
    color: "orange",
    age: 1,
    gender: "male",
    activityLevel: "low",
    favoriteFood: "fish",
  },
];
const columns: ColumnDefinitionType<Cat>[] = [
  {
    key: "name",
    header: "Name",
    width: 150,
  },
  {
    key: "age",
    header: "age",
  },
  {
    key: "color",
    header: "Color",
  },
  {
    key: "gender",
    header: "gender",
  },
  {
    key: "favoriteFood",
    header: "favoriteFood",
  },
  {
    key: "activityLevel",
    header: "activityLevel",
  },
];

// Chart Config
const Dashboard = () => {
  const [chartData,setChartData]=useState<Request>()
  useEffect(()=>{
    try {
      const res = await requestApi.create()
setChartData(res)
    } catch (error) {
      
    }
// End Chart Config
  },[])
  return (
    <div className="dashboard-container">
      <div className="info-container">
        {/* {cardProps().map((cardItem) => (
          <CardInfo
            icon={cardItem.icon}
            title={cardItem.title}
            description={cardItem.description}
          />
        ))} */}
      </div>
      <div className="task-container">
        <CustomeTable data={data} columns={columns} />
      </div>
      <div className="diagram-container">3</div>
    </div>
  );
};

export default Dashboard;
