export default function formatDate(dateStr) {
    const date = new Date(dateStr);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    
    const formatedDate = date.toLocaleDateString('en-US', options);
    
    return formatedDate;
}