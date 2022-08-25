const greet =(element) =>
{   
    
    const emailId=localStorage.email;
    element.textContent=`hello ${emailId}!`;
}
export default greet;