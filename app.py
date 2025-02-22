from settings import *
from model import User

@app.route('/login', methods=['POST','GET'])
@cross_origin()
def login():
    if request.method=='GET':
        return jsonify({'columns': User.get_columns()}),201

    else:
        data=request.json
        if not all(field in data for field in User.get_columns().keys()):
            return jsonify({"message":"Provide all fields."}), 400
        
        try:
            existing_user = User.query.filter_by(uid=data.get('uid')).first()
            if existing_user:
                existing_user.annual_revenue=existing_user.annual_revenue+[data.get('annual_revenue')]
                existing_user.recurring_expenses=existing_user.recurring_expenses+[data.get('recurring_expenses')]
                existing_user.monthly_budget=existing_user.monthly_budget+[data.get('monthly_budget')]
                existing_user.savings=existing_user.savings+[data.get('savings')]
                existing_user.timestamp=existing_user.timestamp+[datetime.now(timezone.utc)]
            else:
                new_user = User(
                    uid=data.get('uid'),
                    industry=data.get('industry'),
                    annual_revenue=[data.get('annual_revenue')],
                    recurring_expenses=[data.get('recurring_expenses')],
                    monthly_budget=[data.get('monthly_budget')],
                    savings=[data.get('savings')],
                    timestamp=[datetime.now(timezone.utc)]
                )
                db.session.add(new_user)

            db.session.commit()
            return jsonify({"message":"Successfully registered in the database."}),201
        except Exception as e:
            return jsonify({"message":f"Error occured:{str(e)}"}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
