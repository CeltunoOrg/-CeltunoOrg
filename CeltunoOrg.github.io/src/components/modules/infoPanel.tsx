import * as React from "react";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import PlannerDataService from "../../services/planner-firebase-service"
import { DataType } from "../../types/day.type";
import { useTheOnValue } from "../../../firebase-planner";
import { Box } from "@mui/material";


const InfoPanel = () => {
    function preventDefault(event) {
        event.preventDefault();
    }
    useEffect(() => {
        getCounts([DataType.Planner, DataType.Presets]);
    });
    
    const [activityCount, setActivityCount] = useState<number>(0)
    const [presetCount, setPresetCount] = useState<number>(0)

    const getCounts = (dataTypes: DataType[]) => {
        dataTypes.forEach(type => {


            PlannerDataService.GetDBref(type).then((data) => {
                useTheOnValue(data, (snapshot) => {
                    if (snapshot.exists()) {
                        console.log("" + type + " count: " + snapshot.size);
                        switch (type) {
                            case DataType.Planner:
                                ActivityCount(snapshot.size)
                                break;
                            case DataType.Presets:
                                PresetCount(snapshot.size)
                                break;
                        }
                    }
                })
            }).catch((error) => {
                console.error(error);
            });

        });
    };

    const PresetCount = (count: number) => {
        setPresetCount(count);
    }
    const ActivityCount = (count: number) => {
        setActivityCount(count);
    }

    return (
        <Box sx= {{ mt:2}}>

        <React.Fragment>
            {/* <Typography component="p" variant="h4">
                Overview
            </Typography> */}
            <Typography component="p" variant="h6">
                Overview
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                Activities  {activityCount}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 2 }}>
                Presets {presetCount}
            </Typography>
            {/* <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                View balance
                </Link>
            </div> */}
        </React.Fragment>
            </Box>
    );
}

export default InfoPanel