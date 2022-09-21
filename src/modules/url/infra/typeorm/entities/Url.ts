import { ICreateUrlDTO } from "../../../dtos/ICreateUrlDTO"
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm"
import { v4 as uuidV4 } from "uuid"

@Entity("url")
export class Url {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column()
    url: string;
    
    @Column()
    title: string;

    @Column()
    postUrl:string

    constructor(){
      if(!this.id) {
        this.id = uuidV4()
      }  
    }
}