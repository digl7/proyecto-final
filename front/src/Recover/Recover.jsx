import React, { Fragment, useState } from 'react'

const Recover = (props) => {
    const [activationCode, setActivationCode] = useState('')
    const [error, setError] = useState(false)
    const [ok, setOk] = useState(false)

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
      setOk('')
      setError('')
      const res = await fetch("http://127.0.0.1:5000/user/activate/"+activationCode, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        }
      })
      if(res.status===200){
        setOk("El correo se ha confirmado con éxito")
      } else{
        setError("Se ha producido un error al confirmar el correo.")
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
                    {ok ? <span style={{color: '#F9BC50', marginBottom: '10px', fontWeight: 'bold'}}>{ok}</span> : <span className="text-danger" style={{marginBottom: '10px', fontWeight: 'bold'}}>{error}</span>}
                    <button onClick={handleActivate} >ENVIAR</button>
                </div>

            </form>
        </Fragment>
    )
}

export default Recover
