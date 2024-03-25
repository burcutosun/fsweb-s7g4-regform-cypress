import axios from "axios";
import { useEffect, useState } from "react";
import { Form, FormGroup, Input, Label, Button, Card, CardBody, CardHeader, FormFeedback, CardFooter } from "reactstrap";

const initialValues={
    firstName:'',
    lastName:'',
    email:'',
    password:'',
}

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
let regex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

export const errorMessages={
    firstName:'Adınızı en az 3 karakter giriniz.',
    lastName:'Soyadınızı en az 3 karakter giriniz.',
    email:'Geçerli bir email adresi giriniz.',
    password:'Parola en az 8 karakterden oluşmalı, büyük harf, küçük harf, sayı ve simge içermelidir.',
}

export default function Register(){    
    const [formData,setFormData]=useState(initialValues);
    const [id,setId]=useState("")
    const[errors,setErrors]=useState({
        firstName:false,
        lastName:false,
        email:false,
        password:false,
    });
    const [isValid,setIsValid]=useState(false);
    
      useEffect(()=>{
        if(formData.firstName.trim().length>=3 && 
        formData.lastName.trim().length>=3 &&
        validateEmail(formData.email) &&
        regex.test(formData.password))
        {
            setIsValid(true);
        }else{
            setIsValid(false);
        }
      },[formData])

    const handleChange=(event)=>{
        const {name,value}=event.target;
        setFormData({...formData, [name]:value});
        if(name=="firstName" || name=="lastName"){
            if(value.trim().length>=3){
                setErrors({...errors, [name]:false});
            }else{
                setErrors({...errors, [name]:true});
            }
        }
        if(name=="email"){
            if(validateEmail(value)){
                setErrors({...errors, [name]:false});
            }else{
                setErrors({...errors, [name]:true});
            }
        }
        if(name=="password"){
            if (regex.test(value)) {
                setErrors({...errors, [name]:false});
            }else{
                setErrors({...errors, [name]:true});
            }
        }
    }
    

    const handleSubmit=(event)=>{
        event.preventDefault();
        if(!isValid) return;
        axios.post("https://reqres.in/api/users",formData)
            .then(res=>{                
                setId(res.data.id);
                setFormData(initialValues);
            })
            .catch(err=>{
                console.warn(err);
            })

    }
    return (
        <>  
            <Card>
                <CardHeader>
                    Kayıt Ol
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="firstName">
                            Ad:
                            </Label>
                            <Input
                            id="firstName"
                            name="firstName"
                            placeholder="Adınızı giriniz"
                            type="text"
                            onChange={handleChange}
                            value={formData.firstName}
                            invalid={errors.firstName}
                            data-cy="firstName-input"
                            />
                            {errors.firstName && <FormFeedback data-cy="error-message">{errorMessages.firstName}</FormFeedback>}
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastName">
                            Soyad:
                            </Label>
                            <Input
                            id="lastName"
                            name="lastName"
                            placeholder="Soyadınızı giriniz"
                            type="text"
                            onChange={handleChange}
                            value={formData.lastName}
                            invalid={errors.lastName}
                            data-cy="lastName-input"
                            />
                            {errors.lastName && <FormFeedback data-cy="error-message">{errorMessages.lastName}</FormFeedback>}
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">
                            Email:
                            </Label>
                            <Input
                            id="email"
                            name="email"
                            placeholder="Mail adresinizi giriniz"
                            type="email"
                            onChange={handleChange}
                            value={formData.email}
                            invalid={errors.email}
                            data-cy="email-input"
                            />
                            {errors.email && <FormFeedback data-cy="error-message">{errorMessages.email}</FormFeedback>}
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">
                            Parola:
                            </Label>
                            <Input
                            id="password"
                            name="password"
                            placeholder="Parola giriniz"
                            type="password"
                            onChange={handleChange}
                            value={formData.password}
                            invalid={errors.password}
                            data-cy="password-input"
                            />
                            {errors.password && <FormFeedback data-cy="error-message">{errorMessages.password}</FormFeedback>}
                        </FormGroup>
                        <Button 
                        disabled={!isValid} data-cy="submit-button"
                        >
                            Kayıt Ol
                        </Button>
                    </Form>        
                </CardBody>
                {id && <CardFooter data-cy="res-id">ID:{id}</CardFooter>}
            </Card>
        </>
    )    
    
}