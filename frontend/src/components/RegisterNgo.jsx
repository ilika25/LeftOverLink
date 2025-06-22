export default function RegisterNgo(){
    return (
        <>
        <form>
            <input type="text" name="NgoName" placeholder="NGO Name" required/>
            <input type="password" name="Password" placeholder="Password" required/>
            <input type="text" name="Address" placeholder="Address" required/>
            <input type="tel" name="phone" placeholder="Phoen No." pattern="[0-9]{10}" required/>
            <input type="email" name="email" placeholder="Email" autoComplete="email" required/>
            <button type="submit">Register</button>
        </form>
        </>
    );
}