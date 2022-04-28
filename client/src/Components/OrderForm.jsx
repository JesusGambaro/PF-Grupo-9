import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addCart, getUserCart, putCart } from "../redux/actions/userCart"
import "../Css/OrderForm.css"
import { useNavigate } from "react-router-dom"
import { postOrder } from "../redux/actions/order"
import Swal from "sweetalert2"

import {CardElement, useStripe, useElements,Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe("pk_test_51KtCmaEyrMDgVNEx9jvaVUbtUuGmXVXmnhrtCnNdsQdVxna17PhfnQ08NrXMMs94GPIyQpOp3RI70VjlNBwHE3ZN00oJfjWvbj");

const PaymentCheckout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = window.localStorage.getItem("token")
    const cart = useSelector(state => state.root.cartUser)
    const paymentInfo = useSelector(state => state.root.paymentInfo)
    console.log ('a',paymentInfo)
    const {totalFootwear,total} = cart
    const stripe = useStripe();
    const elements = useElements();
    const [order, setOrder] = useState({
    telephoneNumber:"",
    address:"",
    name:"",
    surname:"",
    country:"Argentina",
    city:"",
    floor:"",
    apartment:"",


    })
    const [error, setError] = useState({})
    useEffect(() => {
        if(!totalFootwear || !total) {navigate("/home")}
    },[dispatch,token,navigate,addCart,cart,getUserCart,putCart])

    const handleOnChangeForm = (e) => {
        handleErrorForm(e)
        setOrder({...order,[e.target.name]: e.target.value})
    }
    const handleErrorForm = (e) => {
       /*  if(e.target.name === "telephoneNumber"){
            console.log(e.target.value.length)
            if(e.target.value.length === 0) { console.log('a')
             setError({...error,telephoneNumber: "Telephone number is required"})}
            /* else if(e.target.value.length){setError({...error,telephoneNumber: ""})} 
            if(e.target.value.length > 15 || e.target.value.length < 4) {console.log('e') 
            setError({...error,telephoneNumber: "Invalid telephone number"})}
            else if(!e.target.value.length > 15 || !e.target.value.length < 4){setError({...error,telephoneNumber: ""})}
        }
        if(e.target.name === "address"){
            if(!e.target.value.length) { setError({...error,address: "Address is required"})}
            else if(e.target.value.length){ setError({...error,address: ""})}
            if(e.target.value.length > 100) { setError({...error,address: "Invalid address"})}
            else if(!e.target.value.length > 100){ setError({...error,address: ""})}
        }
        if(e.target.name === "name"){
            if(e.target.value.length ===0) {setError({...error,name: "Your name is required"})}
            else if(e.target.value.length!==0){setError({...error,name: ""})}
            if(e.target.value.length > 30 ||/[0-9-]+$/.test(order.name)) {setError({...error,name: "Invalid name"})}
            else if(!e.target.value.length > 30 ||!/[0-9-]+$/.test(order.name)){setError({...error,name: ""})}
        }
        if(e.target.name === "surname"){
            if(!e.target.value.length) return setError({...error,surname: "Your surname is required"})
            if(e.target.value.length > 30 ||/[0-9-]+$/.test(order.surname)) return setError({...error,surname: "Invalid surname"})
        }
        if(e.target.name === "country"){
            if(!e.target.value.length) return setError({...error,country: "Your country is required"})
        }
        if(e.target.name === "city"){
            if(!e.target.value.length) return setError({...error,city: "Your city is required"})
            if(e.target.value.length > 30 ||/[0-9-]+$/.test(order.city)) return setError({...error,city: "Invalid city"})
        }
        if(e.target.name === "postalCode"){
            if(!e.target.value.length) return setError({...error,postalCode: "The Postal Code is required"})
            if(e.target.value.length > 10 ) return setError({...error,postalCode: "Invalid Postal Code"})
        }
        if(e.target.name === "floor"){
            if(order.floor !==""){
            if(!/[0-9-]+$/.test(order.floor)){
            return setError({...error,floor: "The floor must be provided as an integer"})
        }}}
        
         */
    }
    const validation = () =>{
        if(!order.address.length || !order.telephoneNumber.length) return true
        return Object.keys(error).length
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        
         const { error, paymentMethod } = await stripe.createPaymentMethod({
             type: "card",
             card: elements.getElement(CardElement),
           });
           console.log({paymentMethod})
           console.log('datos de la orden',order)
         if(error){return console.log(error)}
          dispatch(postOrder(token,{order, paymentMethod}))


        Swal.fire({
            icon: 'success',
            title: 'The order has been placed',
            showConfirmButton: false,
            timer: 1250,
          }).then( () => {
            // navigate("/home/profile")
          })
    }
    return (
        <div >
            { cart &&
             <section className="order-container">
                <h1 className="fw-bold text-center mb-3">Purchase</h1>
                <form onSubmit={(e) => handleSubmit(e)} className="form">
                    <label className="input-number" ><span>Telephone number<i className="asterisco">*</i></span><input placeholder="3447423612" type="number" name="telephoneNumber" value={order.telephoneNumber} onChange={e => handleOnChangeForm(e)} /></label>
                    {error.telephoneNumber && <label className="col form-label text-danger fw-bold text-end">{error.telephoneNumber}</label>}
                    <label><span>Address<i className="asterisco">*</i></span><input name="address" placeholder="San Martin 35" value={order.address} onChange={e => handleOnChangeForm(e)} /></label>
                    {error.address && <label className="col form-label text-danger fw-bold text-end">{error.address}</label>}
                    <label><span>Name<i className="asterisco">*</i></span><input name="name" placeholder="Luis Eduardo" value={order.name} onChange={e => handleOnChangeForm(e)} /></label>
                    {error.name && <label className="col form-label text-danger fw-bold text-end">{error.name}</label>}
                    <label><span>Surname<i className="asterisco">*</i></span><input name="surname" placeholder="Carrillo Rodríguez" value={order.surname} onChange={e => handleOnChangeForm(e)}/></label>
                    {error.surname && <label className="col form-label text-danger fw-bold text-end">{error.surname}</label>}
                   
                   {/* <div className="country-city"> */}
                   <div className="country">
                   <label><span>Country<i className="asterisco">*</i></span></label>
                    <select className="country-select" id="country" name="country" onChange={e => handleOnChangeForm(e)} >
   <option value="Afganistan">Afghanistan</option>
   <option value="Albania">Albania</option>
   <option value="Algeria">Algeria</option>
   <option value="American Samoa">American Samoa</option>
   <option value="Andorra">Andorra</option>
   <option value="Angola">Angola</option>
   <option value="Anguilla">Anguilla</option>
   <option value="Antigua & Barbuda">Antigua & Barbuda</option>
   <option value="Argentina" selected="selected">Argentina</option>
   <option value="Armenia">Armenia</option>
   <option value="Aruba">Aruba</option>
   <option value="Australia">Australia</option>
   <option value="Austria">Austria</option>
   <option value="Azerbaijan">Azerbaijan</option>
   <option value="Bahamas">Bahamas</option>
   <option value="Bahrain">Bahrain</option>
   <option value="Bangladesh">Bangladesh</option>
   <option value="Barbados">Barbados</option>
   <option value="Belarus">Belarus</option>
   <option value="Belgium">Belgium</option>
   <option value="Belize">Belize</option>
   <option value="Benin">Benin</option>
   <option value="Bermuda">Bermuda</option>
   <option value="Bhutan">Bhutan</option>
   <option value="Bolivia">Bolivia</option>
   <option value="Bonaire">Bonaire</option>
   <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
   <option value="Botswana">Botswana</option>
   <option value="Brazil">Brazil</option>
   <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
   <option value="Brunei">Brunei</option>
   <option value="Bulgaria">Bulgaria</option>
   <option value="Burkina Faso">Burkina Faso</option>
   <option value="Burundi">Burundi</option>
   <option value="Cambodia">Cambodia</option>
   <option value="Cameroon">Cameroon</option>
   <option value="Canada">Canada</option>
   <option value="Canary Islands">Canary Islands</option>
   <option value="Cape Verde">Cape Verde</option>
   <option value="Cayman Islands">Cayman Islands</option>
   <option value="Central African Republic">Central African Republic</option>
   <option value="Chad">Chad</option>
   <option value="Channel Islands">Channel Islands</option>
   <option value="Chile">Chile</option>
   <option value="China">China</option>
   <option value="Christmas Island">Christmas Island</option>
   <option value="Cocos Island">Cocos Island</option>
   <option value="Colombia">Colombia</option>
   <option value="Comoros">Comoros</option>
   <option value="Congo">Congo</option>
   <option value="Cook Islands">Cook Islands</option>
   <option value="Costa Rica">Costa Rica</option>
   <option value="Cote DIvoire">Cote DIvoire</option>
   <option value="Croatia">Croatia</option>
   <option value="Cuba">Cuba</option>
   <option value="Curaco">Curacao</option>
   <option value="Cyprus">Cyprus</option>
   <option value="Czech Republic">Czech Republic</option>
   <option value="Denmark">Denmark</option>
   <option value="Djibouti">Djibouti</option>
   <option value="Dominica">Dominica</option>
   <option value="Dominican Republic">Dominican Republic</option>
   <option value="East Timor">East Timor</option>
   <option value="Ecuador">Ecuador</option>
   <option value="Egypt">Egypt</option>
   <option value="El Salvador">El Salvador</option>
   <option value="Equatorial Guinea">Equatorial Guinea</option>
   <option value="Eritrea">Eritrea</option>
   <option value="Estonia">Estonia</option>
   <option value="Ethiopia">Ethiopia</option>
   <option value="Falkland Islands">Falkland Islands</option>
   <option value="Faroe Islands">Faroe Islands</option>
   <option value="Fiji">Fiji</option>
   <option value="Finland">Finland</option>
   <option value="France">France</option>
   <option value="French Guiana">French Guiana</option>
   <option value="French Polynesia">French Polynesia</option>
   <option value="French Southern Ter">French Southern Ter</option>
   <option value="Gabon">Gabon</option>
   <option value="Gambia">Gambia</option>
   <option value="Georgia">Georgia</option>
   <option value="Germany">Germany</option>
   <option value="Ghana">Ghana</option>
   <option value="Gibraltar">Gibraltar</option>
   <option value="Great Britain">Great Britain</option>
   <option value="Greece">Greece</option>
   <option value="Greenland">Greenland</option>
   <option value="Grenada">Grenada</option>
   <option value="Guadeloupe">Guadeloupe</option>
   <option value="Guam">Guam</option>
   <option value="Guatemala">Guatemala</option>
   <option value="Guinea">Guinea</option>
   <option value="Guyana">Guyana</option>
   <option value="Haiti">Haiti</option>
   <option value="Hawaii">Hawaii</option>
   <option value="Honduras">Honduras</option>
   <option value="Hong Kong">Hong Kong</option>
   <option value="Hungary">Hungary</option>
   <option value="Iceland">Iceland</option>
   <option value="Indonesia">Indonesia</option>
   <option value="India">India</option>
   <option value="Iran">Iran</option>
   <option value="Iraq">Iraq</option>
   <option value="Ireland">Ireland</option>
   <option value="Isle of Man">Isle of Man</option>
   <option value="Israel">Israel</option>
   <option value="Italy">Italy</option>
   <option value="Jamaica">Jamaica</option>
   <option value="Japan">Japan</option>
   <option value="Jordan">Jordan</option>
   <option value="Kazakhstan">Kazakhstan</option>
   <option value="Kenya">Kenya</option>
   <option value="Kiribati">Kiribati</option>
   <option value="Korea North">Korea North</option>
   <option value="Korea Sout">Korea South</option>
   <option value="Kuwait">Kuwait</option>
   <option value="Kyrgyzstan">Kyrgyzstan</option>
   <option value="Laos">Laos</option>
   <option value="Latvia">Latvia</option>
   <option value="Lebanon">Lebanon</option>
   <option value="Lesotho">Lesotho</option>
   <option value="Liberia">Liberia</option>
   <option value="Libya">Libya</option>
   <option value="Liechtenstein">Liechtenstein</option>
   <option value="Lithuania">Lithuania</option>
   <option value="Luxembourg">Luxembourg</option>
   <option value="Macau">Macau</option>
   <option value="Macedonia">Macedonia</option>
   <option value="Madagascar">Madagascar</option>
   <option value="Malaysia">Malaysia</option>
   <option value="Malawi">Malawi</option>
   <option value="Maldives">Maldives</option>
   <option value="Mali">Mali</option>
   <option value="Malta">Malta</option>
   <option value="Marshall Islands">Marshall Islands</option>
   <option value="Martinique">Martinique</option>
   <option value="Mauritania">Mauritania</option>
   <option value="Mauritius">Mauritius</option>
   <option value="Mayotte">Mayotte</option>
   <option value="Mexico">Mexico</option>
   <option value="Midway Islands">Midway Islands</option>
   <option value="Moldova">Moldova</option>
   <option value="Monaco">Monaco</option>
   <option value="Mongolia">Mongolia</option>
   <option value="Montserrat">Montserrat</option>
   <option value="Morocco">Morocco</option>
   <option value="Mozambique">Mozambique</option>
   <option value="Myanmar">Myanmar</option>
   <option value="Nambia">Nambia</option>
   <option value="Nauru">Nauru</option>
   <option value="Nepal">Nepal</option>
   <option value="Netherland Antilles" >Netherland Antilles</option>
   <option value="Netherlands">Netherlands (Holland, Europe)</option>
   <option value="Nevis">Nevis</option>
   <option value="New Caledonia">New Caledonia</option>
   <option value="New Zealand">New Zealand</option>
   <option value="Nicaragua">Nicaragua</option>
   <option value="Niger">Niger</option>
   <option value="Nigeria">Nigeria</option>
   <option value="Niue">Niue</option>
   <option value="Norfolk Island">Norfolk Island</option>
   <option value="Norway">Norway</option>
   <option value="Oman">Oman</option>
   <option value="Pakistan">Pakistan</option>
   <option value="Palau Island">Palau Island</option>
   <option value="Palestine">Palestine</option>
   <option value="Panama">Panama</option>
   <option value="Papua New Guinea">Papua New Guinea</option>
   <option value="Paraguay">Paraguay</option>
   <option value="Peru">Peru</option>
   <option value="Phillipines">Philippines</option>
   <option value="Pitcairn Island">Pitcairn Island</option>
   <option value="Poland">Poland</option>
   <option value="Portugal">Portugal</option>
   <option value="Puerto Rico">Puerto Rico</option>
   <option value="Qatar">Qatar</option>
   <option value="Republic of Montenegro">Republic of Montenegro</option>
   <option value="Republic of Serbia">Republic of Serbia</option>
   <option value="Reunion">Reunion</option>
   <option value="Romania">Romania</option>
   <option value="Russia">Russia</option>
   <option value="Rwanda">Rwanda</option>
   <option value="St Barthelemy">St Barthelemy</option>
   <option value="St Eustatius">St Eustatius</option>
   <option value="St Helena">St Helena</option>
   <option value="St Kitts-Nevis">St Kitts-Nevis</option>
   <option value="St Lucia">St Lucia</option>
   <option value="St Maarten">St Maarten</option>
   <option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
   <option value="St Vincent & Grenadines">St Vincent & Grenadines</option>
   <option value="Saipan">Saipan</option>
   <option value="Samoa">Samoa</option>
   <option value="Samoa American">Samoa American</option>
   <option value="San Marino">San Marino</option>
   <option value="Sao Tome & Principe">Sao Tome & Principe</option>
   <option value="Saudi Arabia">Saudi Arabia</option>
   <option value="Senegal">Senegal</option>
   <option value="Seychelles">Seychelles</option>
   <option value="Sierra Leone">Sierra Leone</option>
   <option value="Singapore">Singapore</option>
   <option value="Slovakia">Slovakia</option>
   <option value="Slovenia">Slovenia</option>
   <option value="Solomon Islands">Solomon Islands</option>
   <option value="Somalia">Somalia</option>
   <option value="South Africa">South Africa</option>
   <option value="Spain">Spain</option>
   <option value="Sri Lanka">Sri Lanka</option>
   <option value="Sudan">Sudan</option>
   <option value="Suriname">Suriname</option>
   <option value="Swaziland">Swaziland</option>
   <option value="Sweden">Sweden</option>
   <option value="Switzerland">Switzerland</option>
   <option value="Syria">Syria</option>
   <option value="Tahiti">Tahiti</option>
   <option value="Taiwan">Taiwan</option>
   <option value="Tajikistan">Tajikistan</option>
   <option value="Tanzania">Tanzania</option>
   <option value="Thailand">Thailand</option>
   <option value="Togo">Togo</option>
   <option value="Tokelau">Tokelau</option>
   <option value="Tonga">Tonga</option>
   <option value="Trinidad & Tobago">Trinidad & Tobago</option>
   <option value="Tunisia">Tunisia</option>
   <option value="Turkey">Turkey</option>
   <option value="Turkmenistan">Turkmenistan</option>
   <option value="Turks & Caicos Is">Turks & Caicos Is</option>
   <option value="Tuvalu">Tuvalu</option>
   <option value="Uganda">Uganda</option>
   <option value="United Kingdom">United Kingdom</option>
   <option value="Ukraine">Ukraine</option>
   <option value="United Arab Erimates">United Arab Emirates</option>
   <option value="United States of America">United States of America</option>
   <option value="Uraguay">Uruguay</option>
   <option value="Uzbekistan">Uzbekistan</option>
   <option value="Vanuatu">Vanuatu</option>
   <option value="Vatican City State">Vatican City State</option>
   <option value="Venezuela">Venezuela</option>
   <option value="Vietnam">Vietnam</option>
   <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
   <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
   <option value="Wake Island">Wake Island</option>
   <option value="Wallis & Futana Is">Wallis & Futana Is</option>
   <option value="Yemen">Yemen</option>
   <option value="Zaire">Zaire</option>
   <option value="Zambia">Zambia</option>
   <option value="Zimbabwe">Zimbabwe</option>
                    </select>
                    </div>
                    <label><span>City<i className="asterisco">*</i></span><input name="city" placeholder="Buenos Aires" value={order.city} onChange={e => handleOnChangeForm(e)}/></label>
                    {error.city && <label className="col form-label text-danger fw-bold text-end">{error.city}</label>}
                    <label><span>Postal Code<i className="asterisco">*</i></span><input name="postalCode" placeholder="10111" value={order.postalCode} onChange={e => handleOnChangeForm(e)}/></label>
                    {error.postalCode && <label className="col form-label text-danger fw-bold text-end">{error.postalCode}</label>}
                    <label><span>Floor</span><input name="floor" placeholder="2" value={order.floor} onChange={e => handleOnChangeForm(e)}/></label>
                    {error.floor && <label className="col form-label text-danger fw-bold text-end">{error.floor}</label>}
                    <label><span>Apartment</span><input name="apartment" placeholder="B" value={order.apartment} onChange={e => handleOnChangeForm(e)}/></label>
                    {error.apartment && <label className="col form-label text-danger fw-bold text-end">{error.apartment}</label>}
                    <label><span>Notes</span><textarea name="notes" placeholder="" value={order.notes} onChange={e => handleOnChangeForm(e)}/></label>
                    {error.notes && <label className="col form-label text-danger fw-bold text-end">{error.notes}</label>}
                    {/* </div> */}
                    <div style={{width:"100%"}}>
                    <CardElement />
                    </div>
                    <div className="totals">
                        <span>Total footwears: {totalFootwear}</span>
                        <span>Order total: ${total}</span>
                    </div>
                    <button className="submit-button" disabled={validation()}><i class="bi bi-bag-fill"></i>Place the order!</button>
                </form>
            </section>}
        </div>
    )
}

export default function OrderForm(){
    return(
        <Elements stripe={stripePromise}>
            <PaymentCheckout/>
        </Elements>
    )
}