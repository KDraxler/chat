import io from "socket.io-client";
import config from "../config/Config";


const socket = io.connect(`http://${config.URL}:${config.PORT}`)

export default socket