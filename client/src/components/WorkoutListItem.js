import React from "react";


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
// import { Button } from "antd";


function WorkoutListItem({workout, onClickAddToRoutine, onClickAddDefaultSetsNReps}) {
    // console.log(workout)
    const workoutName = workout.name[0].toUpperCase() + workout.name.slice(1)

    function handleClick() {
        onClickAddToRoutine(workout.name);
        onClickAddDefaultSetsNReps();
    }

    return (
        <Card className="ExerciseCard" style={{}} sx={{ width: "350px", height: "370px"}} elevation={6} onClick={handleClick}>
        {/* <CardActionArea> */}
          <CardMedia
            component="img"
            height="240px"
            image={workout.gifUrl}
            alt={workout.name}
            sx ={{objectFit: "contain"}}
          />
          <div className="cardContent" style={{height: "130px"}}>
            <Typography sx={{height: "64px", fontWeight: "bold", fontFamily: `'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif`}}gutterBottom variant="h6" align="center" component="div">
              {workoutName}
            </Typography>
            <Typography sx= {{height: "28px"}}variant="body2" color="text.secondary" align="center" component="div">
              {"Target Areas: " + workout.bodyPart + ", " + workout.target}
            </Typography>
            <Button className="ExerciseCardButton" elevation={0} size="small" color="warning" variant="contained" onClick={handleClick}>Add</Button>
            
          </div>
        {/* </CardActionArea> */}
        
        </Card>
    )
}


export default WorkoutListItem