
const ContractForm = function(props) {
    const embedForm = '<button data-tf-slider="q6mbVz0u" data-tf-width="550" data-tf-iframe-props="title=My typeform" data-tf-medium="snippet" style="all:unset;font-family:Helvetica,Arial,sans-serif;display:inline-block;max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;background-color:#5209B2;color:#FFFFFF;font-size:20px;border-radius:25px;padding:0 33px;font-weight:bold;height:50px;cursor:pointer;line-height:50px;text-align:center;margin:0;text-decoration:none;">Get in touch</button><script src="//embed.typeform.com/next/embed.js"></script>';
    const classes = props.class + " " + "z-[1000]";

    return (
        <div className={classes} dangerouslySetInnerHTML={{__html: embedForm}}>
        </div>
    );
}

export default ContractForm;