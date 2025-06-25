export default function Violin() {
    const name = 'Violin';
    const description = 'This is a sample violin description.';
    const price = '12.00';

    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <span>Image</span>
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                <p>{description}</p>
                <p className="fw-black text-primary fs-3">$ {price}</p>
            </div>
        </div>
    )
}