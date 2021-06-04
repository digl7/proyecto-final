import React, { Fragment, useState } from 'react'

const Recover = (props) => {
    const [activationCode, setActivationCode] = useState('')
    const [error, setError] = useState(false)

    const sendData = async (e) => {
        e.preventDefault();
        if (!activationCode.trim()) {
          //si el campo está vacio
          setError("Introduce el código de confirmación");
          return;
        }
        else {
          setError(null);
        }

    }

    const handleActivate = async () => {
      const res = await fetch("http://127.0.0.1:5000/user/activate/"+activationCode, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        }
      })
      if(res.status===200){
        alert("CONFIRMACION CORRECTA")
      } else{
        alert("Se ha producido un error al confirmar el correo.")
      }
    }

    return (
        <Fragment>
            <h1>ACTIVAR EMAIL</h1>
            <form onSubmit={sendData}> 
                <div className="form-container">
                    <label htmlFor="activation_code">Introduce el código de confirmación</label>
                    <input 
                      name="activation_code" 
                      type="text"
                      id="activation_code"
                      alt="Escribe tu codigo de confirmación"
                      placeholder="Código de confirmación"
                      onChange={(e) => setActivationCode(e.target.value)}
                      value={activationCode}
                    />
                    <p>¿Has terminado? <span onClick={props.handleIsLogin} className="yellow"> Inicia sesión</span>.</p>
                    {error ? <span className="text-danger">{error}</span> : null}
                    <button onClick={handleActivate} >ENVIAR</button>
                </div>

            </form>
        </Fragment>
    )
}

export default Recover
