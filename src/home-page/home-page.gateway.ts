import { WebSocketGateway } from '@nestjs/websockets';
import { corsOptions } from 'src/utils/cors.options';

@WebSocketGateway({ corsOptions: corsOptions, namespace: '/' })
export class HomePageGateway {}
