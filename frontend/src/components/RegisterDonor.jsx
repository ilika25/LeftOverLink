export default function RegisterDonor(){
    return (
        <>
        <form>
            <input type="text" name="DonorName" placeholder="DonorName" required/>
            <input type="password" name="Password" placeholder="Password" required/>
            <input type="text" name="Organisation" placeholder="Organisation Name(if applicable)" />
            <input type="tel" name="phone" placeholder="Phoen No." pattern="[0-9]{10}" required/>
            <input type="email" name="email" placeholder="Email" autoComplete="email" required/>
            <button type="submit">Register</button>
        </form>
        </>
    );
}