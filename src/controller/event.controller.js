import * as EventModel from "../model/event.model.js";

//events update

export async function updateEvent(req, res){
    let eventId = req.params.id
    let body = req.body;


    try {

        let response = await EventModel.modifyEvent(eventId, body)
        res.send(response)
        
    } catch (error) {
        if(!error.cause) res.status(400).send(error.message)
        else res.status(error.cause).send(error.message)
    }

}


//delete event 

export async function deleteEventById(req, res) {
    let id = req.params.id;

    try {
        res.send(await eventModel.deleteEventById(id));

    } catch (error) {
        res.status(404).send({
            error: error.message
        });
    }
}
