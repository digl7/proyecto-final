import React, { Fragment, useState } from 'react'

const Recover = (props) => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState(false)

    const sendData = async (e) => {
        e.preventDefault();
        if (!email.trim()) {
          //si el campo está vacio
          setError("Rellena el campo de email");
          return;
        }
        else {
          setError(null);
        }

    }
    return (
        <Fragment>
            <h1>REESTABLECER CONTRASEÑA</h1>
            <p>¿Has olvidado tu contraseña?  No te precupes la tendrás de nuevo.</p>
            <form onSubmit={sendData}> 
                <div className="form-container">
                    <label htmlFor="email">Email</label>
                    <input 
                      name="email" 
                      type="email"
                      id="email"
                      alt="Escribe tu email"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                    <p>¿No la habías olvidado? <span onClick={props.handleIsLogin} className="yellow"> Inicia sesión </span></p>
                    {error ? <span className="text-danger">{error}</span> : null}
                    <button>ENVIAR</button>
                </div>

            </form>
        </Fragment>
    )
}

export default Recover
