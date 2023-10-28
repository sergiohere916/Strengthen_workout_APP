import React from "react";


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


function WorkoutListItem({workout, onClickAddToRoutine}) {
    // console.log(workout)
    const workoutName = workout.name[0].toUpperCase() + workout.name.slice(1)

    function handleClick() {
        onClickAddToRoutine(workout.name)
    }

    return (
        <Card sx={{ maxWidth: 345}} elevation={4}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="auto"
            image={workout.gifUrl}
            alt={workout.name}
            sx ={{objectFit: "cover"}}
          />
          <CardContent className="cardContent">
            <Typography sx={{fontWeight: "bold", fontFamily: `'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif`}}gutterBottom variant="h6" align="center" component="div">
              {workoutName}
            </Typography>
            {/* <Typography variant="body2" color="text.secondary">
              {"Target Areas: " + workout.bodyPart + ", " + workout.target}
            </Typography> */}
            <div onClick={handleClick}>add</div>
            {/* Button is giving problems... */}
          </CardContent>
        </CardActionArea>
        
        </Card>
    )
}


export default WorkoutListItem